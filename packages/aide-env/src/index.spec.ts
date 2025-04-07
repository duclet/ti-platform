import { loadEnv } from '@src/index';
import { expect } from '@ti-platform/aide-test';
import { expand } from 'dotenv-expand';
import { accessSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd, env } from 'process';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';

vi.mock('dotenv-expand', { spy: true });
vi.mock('fs', { spy: true });
vi.mock('path', { spy: true });
vi.mock('process', { spy: true });

describe('loadEnv', () => {
    beforeEach(() => {
        vi.mocked(cwd).mockReturnValue('/fake/root/path');
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should replace the {NODE_ENV} placeholder with the actual NODE_ENV value', () => {
        loadEnv();

        expect(resolve)
            .toHaveBeenCalledTimes(3)
            .toHaveBeenNthCalledWith(1, '/fake/root/path', '.env')
            .toHaveBeenNthCalledWith(2, '/fake/root/path', '.env.test')
            .toHaveBeenNthCalledWith(3, '/fake/root/path', '.env.local');
    });

    it('should fallback to development if NODE_ENV is not set', () => {
        env.NODE_ENV = undefined;

        loadEnv();

        expect(resolve)
            .toHaveBeenCalledTimes(3)
            .toHaveBeenNthCalledWith(1, '/fake/root/path', '.env')
            .toHaveBeenNthCalledWith(2, '/fake/root/path', '.env.development')
            .toHaveBeenNthCalledWith(3, '/fake/root/path', '.env.local');

        env.NODE_ENV = 'test';
    });

    it('should read and parse files that exists', () => {
        vi.mocked(accessSync).mockReturnValue();
        vi.mocked(readFileSync)
            .mockReturnValueOnce('one=from.env')
            .mockReturnValueOnce('one=from.env.test')
            .mockReturnValueOnce('one=from.env.local');

        loadEnv();

        expect(expand).toHaveBeenCalledWith({
            parsed: {
                one: 'from.env.local',
            },
        });
    });

    it('should skip files which does not exists', () => {
        vi.mocked(accessSync)
            .mockReturnValueOnce()
            .mockReturnValueOnce()
            .mockImplementationOnce(() => {
                throw new Error('File does not exists');
            });

        vi.mocked(readFileSync).mockReturnValueOnce('two=from.env').mockReturnValueOnce('two=from.env.test');

        loadEnv();

        expect(readFileSync).toHaveBeenCalledTimes(2);
        expect(expand).toHaveBeenCalledWith({
            parsed: {
                two: 'from.env.test',
            },
        });
    });
});
