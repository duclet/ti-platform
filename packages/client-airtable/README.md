# @ti-platform/client-airtable

This client provides a client to interact with Airtable.

Ideally, this package should not even need to exist since Airtable have provided their own client. However, they refuse
to actually implement all features of their REST APIs with their client. This package tries to fix that.

# Contents

* [Example Usage](#example-usage)
* [API Docs](#api-docs)
  * [Enumerations](#enumerations)
    * [CellFormat](#cellformat)
    * [Direction](#direction)
    * [Timezone](#timezone)
    * [UpdateType](#updatetype)
    * [UserLocale](#userlocale)
  * [Classes](#classes)
    * [AirtableClient](#airtableclient)
  * [Interfaces](#interfaces)
    * [CreateRecordsRequest\<Fields>](#createrecordsrequestfields)
    * [CreateRecordsResponse\<Fields>](#createrecordsresponsefields)
    * [DeleteRecordsRequest](#deleterecordsrequest)
    * [DeleteRecordsResponse](#deleterecordsresponse)
    * [GetRecordRequest](#getrecordrequest)
    * [IndividualRecord\<Fields>](#individualrecordfields)
    * [ListRecordsRequest\<Fields>](#listrecordsrequestfields)
    * [ListRecordsResponse\<Fields>](#listrecordsresponsefields)
    * [UpdateRecordsRequestNonUpsert\<Fields>](#updaterecordsrequestnonupsertfields)
    * [UpdateRecordsRequestUpsert\<Fields>](#updaterecordsrequestupsertfields)
    * [UpdateRecordsResponseNonUpsert\<Fields>](#updaterecordsresponsenonupsertfields)
    * [UpdateRecordsResponseUpsert\<Fields>](#updaterecordsresponseupsertfields)
  * [Type Aliases](#type-aliases)
    * [RecordFields](#recordfields)
    * [UnionToTuple\<U, R>](#uniontotupleu-r)
  * [Variables](#variables)
    * [MAXIMUM\_RECORDS\_PER\_BATCH](#maximum_records_per_batch)
    * [REQUESTS\_PER\_SECOND\_PER\_ACCESS\_TOKEN](#requests_per_second_per_access_token)
    * [REQUESTS\_PER\_SECOND\_PER\_BASE](#requests_per_second_per_base)

# Example Usage

```typescript
import {AirtableClient } from "@ti-platform/client-airtable";

const client = new AirtableClient('my-api-token');

const records = await client.listRecords<{ Field1: boolean; Field2: string }>({
    baseId: 'app12345',
    tableId: 'tbl12345',
    fields: ['Field1', 'Field2'],
    maxRecords: 10,
});
```

# API Docs

## Enumerations

### CellFormat

The format that should be used for cell values.

The [Timezone](README.md#timezone) and [UserLocale](README.md#userlocale) parameters are required when using `string` as the cell  format.

Note: You should not rely on the format of these strings, as it is subject to change.

The default is `json`.

#### Enumeration Members

| Enumeration Member | Value      | Description                                                                   |
| ------------------ | ---------- | ----------------------------------------------------------------------------- |
| `JSON`             | `"json"`   | Cells will be formatted as JSON, depending on the field type.                 |
| `STRING`           | `"string"` | Cells will be formatted as user-facing strings, regardless of the field type. |

***

### Direction

The direction to sort results.

The default is `asc`.

#### Enumeration Members

| Enumeration Member | Value    | Description               |
| ------------------ | -------- | ------------------------- |
| `ASC`              | `"asc"`  | Sort in ascending order.  |
| `DESC`             | `"desc"` | Sort in descending order. |

***

### Timezone

The time zone that should be used to format dates when using `string` as the [CellFormat](README.md#cellformat).

#### Enumeration Members

| Enumeration Member               | Value                              |
| -------------------------------- | ---------------------------------- |
| `AFRICA_ABIDJAN`                 | `"Africa/Abidjan"`                 |
| `AFRICA_ACCRA`                   | `"Africa/Accra"`                   |
| `AFRICA_ADDIS_ABABA`             | `"Africa/Addis_Ababa"`             |
| `AFRICA_ALGIERS`                 | `"Africa/Algiers"`                 |
| `AFRICA_ASMARA`                  | `"Africa/Asmara"`                  |
| `AFRICA_BAMAKO`                  | `"Africa/Bamako"`                  |
| `AFRICA_BANGUI`                  | `"Africa/Bangui"`                  |
| `AFRICA_BANJUL`                  | `"Africa/Banjul"`                  |
| `AFRICA_BISSAU`                  | `"Africa/Bissau"`                  |
| `AFRICA_BLANTYRE`                | `"Africa/Blantyre"`                |
| `AFRICA_BRAZZAVILLE`             | `"Africa/Brazzaville"`             |
| `AFRICA_BUJUMBURA`               | `"Africa/Bujumbura"`               |
| `AFRICA_CAIRO`                   | `"Africa/Cairo"`                   |
| `AFRICA_CASABLANCA`              | `"Africa/Casablanca"`              |
| `AFRICA_CEUTA`                   | `"Africa/Ceuta"`                   |
| `AFRICA_CONAKRY`                 | `"Africa/Conakry"`                 |
| `AFRICA_DAKAR`                   | `"Africa/Dakar"`                   |
| `AFRICA_DAR_ES_SALAAM`           | `"Africa/Dar_es_Salaam"`           |
| `AFRICA_DJIBOUTI`                | `"Africa/Djibouti"`                |
| `AFRICA_DOUALA`                  | `"Africa/Douala"`                  |
| `AFRICA_EL_AAIUN`                | `"Africa/El_Aaiun"`                |
| `AFRICA_FREETOWN`                | `"Africa/Freetown"`                |
| `AFRICA_GABORONE`                | `"Africa/Gaborone"`                |
| `AFRICA_HARARE`                  | `"Africa/Harare"`                  |
| `AFRICA_JOHANNESBURG`            | `"Africa/Johannesburg"`            |
| `AFRICA_JUBA`                    | `"Africa/Juba"`                    |
| `AFRICA_KAMPALA`                 | `"Africa/Kampala"`                 |
| `AFRICA_KHARTOUM`                | `"Africa/Khartoum"`                |
| `AFRICA_KIGALI`                  | `"Africa/Kigali"`                  |
| `AFRICA_KINSHASA`                | `"Africa/Kinshasa"`                |
| `AFRICA_LAGOS`                   | `"Africa/Lagos"`                   |
| `AFRICA_LIBREVILLE`              | `"Africa/Libreville"`              |
| `AFRICA_LOME`                    | `"Africa/Lome"`                    |
| `AFRICA_LUANDA`                  | `"Africa/Luanda"`                  |
| `AFRICA_LUBUMBASHI`              | `"Africa/Lubumbashi"`              |
| `AFRICA_LUSAKA`                  | `"Africa/Lusaka"`                  |
| `AFRICA_MALABO`                  | `"Africa/Malabo"`                  |
| `AFRICA_MAPUTO`                  | `"Africa/Maputo"`                  |
| `AFRICA_MASERU`                  | `"Africa/Maseru"`                  |
| `AFRICA_MBABANE`                 | `"Africa/Mbabane"`                 |
| `AFRICA_MOGADISHU`               | `"Africa/Mogadishu"`               |
| `AFRICA_MONROVIA`                | `"Africa/Monrovia"`                |
| `AFRICA_NAIROBI`                 | `"Africa/Nairobi"`                 |
| `AFRICA_NDJAMENA`                | `"Africa/Ndjamena"`                |
| `AFRICA_NIAMEY`                  | `"Africa/Niamey"`                  |
| `AFRICA_NOUAKCHOTT`              | `"Africa/Nouakchott"`              |
| `AFRICA_OUAGADOUGOU`             | `"Africa/Ouagadougou"`             |
| `AFRICA_PORTO_NOVO`              | `"Africa/Porto-Novo"`              |
| `AFRICA_SAO_TOME`                | `"Africa/Sao_Tome"`                |
| `AFRICA_TRIPOLI`                 | `"Africa/Tripoli"`                 |
| `AFRICA_TUNIS`                   | `"Africa/Tunis"`                   |
| `AFRICA_WINDHOEK`                | `"Africa/Windhoek"`                |
| `AMERICA_ADAK`                   | `"America/Adak"`                   |
| `AMERICA_ANCHORAGE`              | `"America/Anchorage"`              |
| `AMERICA_ANGUILLA`               | `"America/Anguilla"`               |
| `AMERICA_ANTIGUA`                | `"America/Antigua"`                |
| `AMERICA_ARAGUAINA`              | `"America/Araguaina"`              |
| `AMERICA_ARGENTINA_BUENOS_AIRES` | `"America/Argentina/Buenos_Aires"` |
| `AMERICA_ARGENTINA_CATAMARCA`    | `"America/Argentina/Catamarca"`    |
| `AMERICA_ARGENTINA_CORDOBA`      | `"America/Argentina/Cordoba"`      |
| `AMERICA_ARGENTINA_JUJUY`        | `"America/Argentina/Jujuy"`        |
| `AMERICA_ARGENTINA_LA_RIOJA`     | `"America/Argentina/La_Rioja"`     |
| `AMERICA_ARGENTINA_MENDOZA`      | `"America/Argentina/Mendoza"`      |
| `AMERICA_ARGENTINA_RIO_GALLEGOS` | `"America/Argentina/Rio_Gallegos"` |
| `AMERICA_ARGENTINA_SALTA`        | `"America/Argentina/Salta"`        |
| `AMERICA_ARGENTINA_SAN_JUAN`     | `"America/Argentina/San_Juan"`     |
| `AMERICA_ARGENTINA_SAN_LUIS`     | `"America/Argentina/San_Luis"`     |
| `AMERICA_ARGENTINA_TUCUMAN`      | `"America/Argentina/Tucuman"`      |
| `AMERICA_ARGENTINA_USHUAIA`      | `"America/Argentina/Ushuaia"`      |
| `AMERICA_ARUBA`                  | `"America/Aruba"`                  |
| `AMERICA_ASUNCION`               | `"America/Asuncion"`               |
| `AMERICA_ATIKOKAN`               | `"America/Atikokan"`               |
| `AMERICA_BAHIA`                  | `"America/Bahia"`                  |
| `AMERICA_BAHIA_BANDERAS`         | `"America/Bahia_Banderas"`         |
| `AMERICA_BARBADOS`               | `"America/Barbados"`               |
| `AMERICA_BELEM`                  | `"America/Belem"`                  |
| `AMERICA_BELIZE`                 | `"America/Belize"`                 |
| `AMERICA_BLANC_SABLON`           | `"America/Blanc-Sablon"`           |
| `AMERICA_BOA_VISTA`              | `"America/Boa_Vista"`              |
| `AMERICA_BOGOTA`                 | `"America/Bogota"`                 |
| `AMERICA_BOISE`                  | `"America/Boise"`                  |
| `AMERICA_CAMBRIDGE_BAY`          | `"America/Cambridge_Bay"`          |
| `AMERICA_CAMPO_GRANDE`           | `"America/Campo_Grande"`           |
| `AMERICA_CANCUN`                 | `"America/Cancun"`                 |
| `AMERICA_CARACAS`                | `"America/Caracas"`                |
| `AMERICA_CAYENNE`                | `"America/Cayenne"`                |
| `AMERICA_CAYMAN`                 | `"America/Cayman"`                 |
| `AMERICA_CHICAGO`                | `"America/Chicago"`                |
| `AMERICA_CHIHUAHUA`              | `"America/Chihuahua"`              |
| `AMERICA_COSTA_RICA`             | `"America/Costa_Rica"`             |
| `AMERICA_CRESTON`                | `"America/Creston"`                |
| `AMERICA_CUIABA`                 | `"America/Cuiaba"`                 |
| `AMERICA_CURACAO`                | `"America/Curacao"`                |
| `AMERICA_DANMARKSHAVN`           | `"America/Danmarkshavn"`           |
| `AMERICA_DAWSON`                 | `"America/Dawson"`                 |
| `AMERICA_DAWSON_CREEK`           | `"America/Dawson_Creek"`           |
| `AMERICA_DENVER`                 | `"America/Denver"`                 |
| `AMERICA_DETROIT`                | `"America/Detroit"`                |
| `AMERICA_DOMINICA`               | `"America/Dominica"`               |
| `AMERICA_EDMONTON`               | `"America/Edmonton"`               |
| `AMERICA_EIRUNEPE`               | `"America/Eirunepe"`               |
| `AMERICA_EL_SALVADOR`            | `"America/El_Salvador"`            |
| `AMERICA_FORTALEZA`              | `"America/Fortaleza"`              |
| `AMERICA_FORT_NELSON`            | `"America/Fort_Nelson"`            |
| `AMERICA_GLACE_BAY`              | `"America/Glace_Bay"`              |
| `AMERICA_GODTHAB`                | `"America/Godthab"`                |
| `AMERICA_GOOSE_BAY`              | `"America/Goose_Bay"`              |
| `AMERICA_GRAND_TURK`             | `"America/Grand_Turk"`             |
| `AMERICA_GRENADA`                | `"America/Grenada"`                |
| `AMERICA_GUADELOUPE`             | `"America/Guadeloupe"`             |
| `AMERICA_GUATEMALA`              | `"America/Guatemala"`              |
| `AMERICA_GUAYAQUIL`              | `"America/Guayaquil"`              |
| `AMERICA_GUYANA`                 | `"America/Guyana"`                 |
| `AMERICA_HALIFAX`                | `"America/Halifax"`                |
| `AMERICA_HAVANA`                 | `"America/Havana"`                 |
| `AMERICA_HERMOSILLO`             | `"America/Hermosillo"`             |
| `AMERICA_INDIANA_INDIANAPOLIS`   | `"America/Indiana/Indianapolis"`   |
| `AMERICA_INDIANA_KNOX`           | `"America/Indiana/Knox"`           |
| `AMERICA_INDIANA_MARENGO`        | `"America/Indiana/Marengo"`        |
| `AMERICA_INDIANA_PETERSBURG`     | `"America/Indiana/Petersburg"`     |
| `AMERICA_INDIANA_TELL_CITY`      | `"America/Indiana/Tell_City"`      |
| `AMERICA_INDIANA_VEVAY`          | `"America/Indiana/Vevay"`          |
| `AMERICA_INDIANA_VINCENNES`      | `"America/Indiana/Vincennes"`      |
| `AMERICA_INDIANA_WINAMAC`        | `"America/Indiana/Winamac"`        |
| `AMERICA_INUVIK`                 | `"America/Inuvik"`                 |
| `AMERICA_IQALUIT`                | `"America/Iqaluit"`                |
| `AMERICA_JAMAICA`                | `"America/Jamaica"`                |
| `AMERICA_JUNEAU`                 | `"America/Juneau"`                 |
| `AMERICA_KENTUCKY_LOUISVILLE`    | `"America/Kentucky/Louisville"`    |
| `AMERICA_KENTUCKY_MONTICELLO`    | `"America/Kentucky/Monticello"`    |
| `AMERICA_KRALENDIJK`             | `"America/Kralendijk"`             |
| `AMERICA_LA_PAZ`                 | `"America/La_Paz"`                 |
| `AMERICA_LIMA`                   | `"America/Lima"`                   |
| `AMERICA_LOS_ANGELES`            | `"America/Los_Angeles"`            |
| `AMERICA_LOWER_PRINCES`          | `"America/Lower_Princes"`          |
| `AMERICA_MACEIO`                 | `"America/Maceio"`                 |
| `AMERICA_MANAGUA`                | `"America/Managua"`                |
| `AMERICA_MANAUS`                 | `"America/Manaus"`                 |
| `AMERICA_MARIGOT`                | `"America/Marigot"`                |
| `AMERICA_MARTINIQUE`             | `"America/Martinique"`             |
| `AMERICA_MATAMOROS`              | `"America/Matamoros"`              |
| `AMERICA_MAZATLAN`               | `"America/Mazatlan"`               |
| `AMERICA_MENOMINEE`              | `"America/Menominee"`              |
| `AMERICA_MERIDA`                 | `"America/Merida"`                 |
| `AMERICA_METLAKATLA`             | `"America/Metlakatla"`             |
| `AMERICA_MEXICO_CITY`            | `"America/Mexico_City"`            |
| `AMERICA_MIQUELON`               | `"America/Miquelon"`               |
| `AMERICA_MONCTON`                | `"America/Moncton"`                |
| `AMERICA_MONTERREY`              | `"America/Monterrey"`              |
| `AMERICA_MONTEVIDEO`             | `"America/Montevideo"`             |
| `AMERICA_MONTSERRAT`             | `"America/Montserrat"`             |
| `AMERICA_NASSAU`                 | `"America/Nassau"`                 |
| `AMERICA_NEW_YORK`               | `"America/New_York"`               |
| `AMERICA_NIPIGON`                | `"America/Nipigon"`                |
| `AMERICA_NOME`                   | `"America/Nome"`                   |
| `AMERICA_NORONHA`                | `"America/Noronha"`                |
| `AMERICA_NORTH_DAKOTA_BEULAH`    | `"America/North_Dakota/Beulah"`    |
| `AMERICA_NORTH_DAKOTA_CENTER`    | `"America/North_Dakota/Center"`    |
| `AMERICA_NORTH_DAKOTA_NEW_SALEM` | `"America/North_Dakota/New_Salem"` |
| `AMERICA_NUUK`                   | `"America/Nuuk"`                   |
| `AMERICA_OJINAGA`                | `"America/Ojinaga"`                |
| `AMERICA_PANAMA`                 | `"America/Panama"`                 |
| `AMERICA_PANGNIRTUNG`            | `"America/Pangnirtung"`            |
| `AMERICA_PARAMARIBO`             | `"America/Paramaribo"`             |
| `AMERICA_PHOENIX`                | `"America/Phoenix"`                |
| `AMERICA_PORTO_VELHO`            | `"America/Porto_Velho"`            |
| `AMERICA_PORT_AU_PRINCE`         | `"America/Port-au-Prince"`         |
| `AMERICA_PORT_OF_SPAIN`          | `"America/Port_of_Spain"`          |
| `AMERICA_PUERTO_RICO`            | `"America/Puerto_Rico"`            |
| `AMERICA_PUNTA_ARENAS`           | `"America/Punta_Arenas"`           |
| `AMERICA_RAINY_RIVER`            | `"America/Rainy_River"`            |
| `AMERICA_RANKIN_INLET`           | `"America/Rankin_Inlet"`           |
| `AMERICA_RECIFE`                 | `"America/Recife"`                 |
| `AMERICA_REGINA`                 | `"America/Regina"`                 |
| `AMERICA_RESOLUTE`               | `"America/Resolute"`               |
| `AMERICA_RIO_BRANCO`             | `"America/Rio_Branco"`             |
| `AMERICA_SANTAREM`               | `"America/Santarem"`               |
| `AMERICA_SANTIAGO`               | `"America/Santiago"`               |
| `AMERICA_SANTO_DOMINGO`          | `"America/Santo_Domingo"`          |
| `AMERICA_SAO_PAULO`              | `"America/Sao_Paulo"`              |
| `AMERICA_SCORESBYSUND`           | `"America/Scoresbysund"`           |
| `AMERICA_SITKA`                  | `"America/Sitka"`                  |
| `AMERICA_ST_BARTHELEMY`          | `"America/St_Barthelemy"`          |
| `AMERICA_ST_JOHNS`               | `"America/St_Johns"`               |
| `AMERICA_ST_KITTS`               | `"America/St_Kitts"`               |
| `AMERICA_ST_LUCIA`               | `"America/St_Lucia"`               |
| `AMERICA_ST_THOMAS`              | `"America/St_Thomas"`              |
| `AMERICA_ST_VINCENT`             | `"America/St_Vincent"`             |
| `AMERICA_SWIFT_CURRENT`          | `"America/Swift_Current"`          |
| `AMERICA_TEGUCIGALPA`            | `"America/Tegucigalpa"`            |
| `AMERICA_THULE`                  | `"America/Thule"`                  |
| `AMERICA_THUNDER_BAY`            | `"America/Thunder_Bay"`            |
| `AMERICA_TIJUANA`                | `"America/Tijuana"`                |
| `AMERICA_TORONTO`                | `"America/Toronto"`                |
| `AMERICA_TORTOLA`                | `"America/Tortola"`                |
| `AMERICA_VANCOUVER`              | `"America/Vancouver"`              |
| `AMERICA_WHITEHORSE`             | `"America/Whitehorse"`             |
| `AMERICA_WINNIPEG`               | `"America/Winnipeg"`               |
| `AMERICA_YAKUTAT`                | `"America/Yakutat"`                |
| `AMERICA_YELLOWKNIFE`            | `"America/Yellowknife"`            |
| `ANTARCTICA_CASEY`               | `"Antarctica/Casey"`               |
| `ANTARCTICA_DAVIS`               | `"Antarctica/Davis"`               |
| `ANTARCTICA_DUMONTDURVILLE`      | `"Antarctica/DumontDUrville"`      |
| `ANTARCTICA_MACQUARIE`           | `"Antarctica/Macquarie"`           |
| `ANTARCTICA_MAWSON`              | `"Antarctica/Mawson"`              |
| `ANTARCTICA_MCMURDO`             | `"Antarctica/McMurdo"`             |
| `ANTARCTICA_PALMER`              | `"Antarctica/Palmer"`              |
| `ANTARCTICA_ROTHERA`             | `"Antarctica/Rothera"`             |
| `ANTARCTICA_SYOWA`               | `"Antarctica/Syowa"`               |
| `ANTARCTICA_TROLL`               | `"Antarctica/Troll"`               |
| `ANTARCTICA_VOSTOK`              | `"Antarctica/Vostok"`              |
| `ARCTIC_LONGYEARBYEN`            | `"Arctic/Longyearbyen"`            |
| `ASIA_ADEN`                      | `"Asia/Aden"`                      |
| `ASIA_ALMATY`                    | `"Asia/Almaty"`                    |
| `ASIA_AMMAN`                     | `"Asia/Amman"`                     |
| `ASIA_ANADYR`                    | `"Asia/Anadyr"`                    |
| `ASIA_AQTAU`                     | `"Asia/Aqtau"`                     |
| `ASIA_AQTOBE`                    | `"Asia/Aqtobe"`                    |
| `ASIA_ASHGABAT`                  | `"Asia/Ashgabat"`                  |
| `ASIA_ATYRAU`                    | `"Asia/Atyrau"`                    |
| `ASIA_BAGHDAD`                   | `"Asia/Baghdad"`                   |
| `ASIA_BAHRAIN`                   | `"Asia/Bahrain"`                   |
| `ASIA_BAKU`                      | `"Asia/Baku"`                      |
| `ASIA_BANGKOK`                   | `"Asia/Bangkok"`                   |
| `ASIA_BARNAUL`                   | `"Asia/Barnaul"`                   |
| `ASIA_BEIRUT`                    | `"Asia/Beirut"`                    |
| `ASIA_BISHKEK`                   | `"Asia/Bishkek"`                   |
| `ASIA_BRUNEI`                    | `"Asia/Brunei"`                    |
| `ASIA_CHITA`                     | `"Asia/Chita"`                     |
| `ASIA_CHOIBALSAN`                | `"Asia/Choibalsan"`                |
| `ASIA_COLOMBO`                   | `"Asia/Colombo"`                   |
| `ASIA_DAMASCUS`                  | `"Asia/Damascus"`                  |
| `ASIA_DHAKA`                     | `"Asia/Dhaka"`                     |
| `ASIA_DILI`                      | `"Asia/Dili"`                      |
| `ASIA_DUBAI`                     | `"Asia/Dubai"`                     |
| `ASIA_DUSHANBE`                  | `"Asia/Dushanbe"`                  |
| `ASIA_FAMAGUSTA`                 | `"Asia/Famagusta"`                 |
| `ASIA_GAZA`                      | `"Asia/Gaza"`                      |
| `ASIA_HEBRON`                    | `"Asia/Hebron"`                    |
| `ASIA_HONG_KONG`                 | `"Asia/Hong_Kong"`                 |
| `ASIA_HOVD`                      | `"Asia/Hovd"`                      |
| `ASIA_HO_CHI_MINH`               | `"Asia/Ho_Chi_Minh"`               |
| `ASIA_IRKUTSK`                   | `"Asia/Irkutsk"`                   |
| `ASIA_ISTANBUL`                  | `"Asia/Istanbul"`                  |
| `ASIA_JAKARTA`                   | `"Asia/Jakarta"`                   |
| `ASIA_JAYAPURA`                  | `"Asia/Jayapura"`                  |
| `ASIA_JERUSALEM`                 | `"Asia/Jerusalem"`                 |
| `ASIA_KABUL`                     | `"Asia/Kabul"`                     |
| `ASIA_KAMCHATKA`                 | `"Asia/Kamchatka"`                 |
| `ASIA_KARACHI`                   | `"Asia/Karachi"`                   |
| `ASIA_KATHMANDU`                 | `"Asia/Kathmandu"`                 |
| `ASIA_KHANDYGA`                  | `"Asia/Khandyga"`                  |
| `ASIA_KOLKATA`                   | `"Asia/Kolkata"`                   |
| `ASIA_KRASNOYARSK`               | `"Asia/Krasnoyarsk"`               |
| `ASIA_KUALA_LUMPUR`              | `"Asia/Kuala_Lumpur"`              |
| `ASIA_KUCHING`                   | `"Asia/Kuching"`                   |
| `ASIA_KUWAIT`                    | `"Asia/Kuwait"`                    |
| `ASIA_MACAU`                     | `"Asia/Macau"`                     |
| `ASIA_MAGADAN`                   | `"Asia/Magadan"`                   |
| `ASIA_MAKASSAR`                  | `"Asia/Makassar"`                  |
| `ASIA_MANILA`                    | `"Asia/Manila"`                    |
| `ASIA_MUSCAT`                    | `"Asia/Muscat"`                    |
| `ASIA_NICOSIA`                   | `"Asia/Nicosia"`                   |
| `ASIA_NOVOKUZNETSK`              | `"Asia/Novokuznetsk"`              |
| `ASIA_NOVOSIBIRSK`               | `"Asia/Novosibirsk"`               |
| `ASIA_OMSK`                      | `"Asia/Omsk"`                      |
| `ASIA_ORAL`                      | `"Asia/Oral"`                      |
| `ASIA_PHNOM_PENH`                | `"Asia/Phnom_Penh"`                |
| `ASIA_PONTIANAK`                 | `"Asia/Pontianak"`                 |
| `ASIA_PYONGYANG`                 | `"Asia/Pyongyang"`                 |
| `ASIA_QATAR`                     | `"Asia/Qatar"`                     |
| `ASIA_QOSTANAY`                  | `"Asia/Qostanay"`                  |
| `ASIA_QYZYLORDA`                 | `"Asia/Qyzylorda"`                 |
| `ASIA_RANGOON`                   | `"Asia/Rangoon"`                   |
| `ASIA_RIYADH`                    | `"Asia/Riyadh"`                    |
| `ASIA_SAKHALIN`                  | `"Asia/Sakhalin"`                  |
| `ASIA_SAMARKAND`                 | `"Asia/Samarkand"`                 |
| `ASIA_SEOUL`                     | `"Asia/Seoul"`                     |
| `ASIA_SHANGHAI`                  | `"Asia/Shanghai"`                  |
| `ASIA_SINGAPORE`                 | `"Asia/Singapore"`                 |
| `ASIA_SREDNEKOLYMSK`             | `"Asia/Srednekolymsk"`             |
| `ASIA_TAIPEI`                    | `"Asia/Taipei"`                    |
| `ASIA_TASHKENT`                  | `"Asia/Tashkent"`                  |
| `ASIA_TBILISI`                   | `"Asia/Tbilisi"`                   |
| `ASIA_TEHRAN`                    | `"Asia/Tehran"`                    |
| `ASIA_THIMPHU`                   | `"Asia/Thimphu"`                   |
| `ASIA_TOKYO`                     | `"Asia/Tokyo"`                     |
| `ASIA_TOMSK`                     | `"Asia/Tomsk"`                     |
| `ASIA_ULAANBAATAR`               | `"Asia/Ulaanbaatar"`               |
| `ASIA_URUMQI`                    | `"Asia/Urumqi"`                    |
| `ASIA_UST_NERA`                  | `"Asia/Ust-Nera"`                  |
| `ASIA_VIENTIANE`                 | `"Asia/Vientiane"`                 |
| `ASIA_VLADIVOSTOK`               | `"Asia/Vladivostok"`               |
| `ASIA_YAKUTSK`                   | `"Asia/Yakutsk"`                   |
| `ASIA_YANGON`                    | `"Asia/Yangon"`                    |
| `ASIA_YEKATERINBURG`             | `"Asia/Yekaterinburg"`             |
| `ASIA_YEREVAN`                   | `"Asia/Yerevan"`                   |
| `ATLANTIC_AZORES`                | `"Atlantic/Azores"`                |
| `ATLANTIC_BERMUDA`               | `"Atlantic/Bermuda"`               |
| `ATLANTIC_CANARY`                | `"Atlantic/Canary"`                |
| `ATLANTIC_CAPE_VERDE`            | `"Atlantic/Cape_Verde"`            |
| `ATLANTIC_FAROE`                 | `"Atlantic/Faroe"`                 |
| `ATLANTIC_MADEIRA`               | `"Atlantic/Madeira"`               |
| `ATLANTIC_REYKJAVIK`             | `"Atlantic/Reykjavik"`             |
| `ATLANTIC_SOUTH_GEORGIA`         | `"Atlantic/South_Georgia"`         |
| `ATLANTIC_STANLEY`               | `"Atlantic/Stanley"`               |
| `ATLANTIC_ST_HELENA`             | `"Atlantic/St_Helena"`             |
| `AUSTRALIA_ADELAIDE`             | `"Australia/Adelaide"`             |
| `AUSTRALIA_BRISBANE`             | `"Australia/Brisbane"`             |
| `AUSTRALIA_BROKEN_HILL`          | `"Australia/Broken_Hill"`          |
| `AUSTRALIA_CURRIE`               | `"Australia/Currie"`               |
| `AUSTRALIA_DARWIN`               | `"Australia/Darwin"`               |
| `AUSTRALIA_EUCLA`                | `"Australia/Eucla"`                |
| `AUSTRALIA_HOBART`               | `"Australia/Hobart"`               |
| `AUSTRALIA_LINDEMAN`             | `"Australia/Lindeman"`             |
| `AUSTRALIA_LORD_HOWE`            | `"Australia/Lord_Howe"`            |
| `AUSTRALIA_MELBOURNE`            | `"Australia/Melbourne"`            |
| `AUSTRALIA_PERTH`                | `"Australia/Perth"`                |
| `AUSTRALIA_SYDNEY`               | `"Australia/Sydney"`               |
| `CLIENT`                         | `"client"`                         |
| `EUROPE_AMSTERDAM`               | `"Europe/Amsterdam"`               |
| `EUROPE_ANDORRA`                 | `"Europe/Andorra"`                 |
| `EUROPE_ASTRAKHAN`               | `"Europe/Astrakhan"`               |
| `EUROPE_ATHENS`                  | `"Europe/Athens"`                  |
| `EUROPE_BELGRADE`                | `"Europe/Belgrade"`                |
| `EUROPE_BERLIN`                  | `"Europe/Berlin"`                  |
| `EUROPE_BRATISLAVA`              | `"Europe/Bratislava"`              |
| `EUROPE_BRUSSELS`                | `"Europe/Brussels"`                |
| `EUROPE_BUCHAREST`               | `"Europe/Bucharest"`               |
| `EUROPE_BUDAPEST`                | `"Europe/Budapest"`                |
| `EUROPE_BUSINGEN`                | `"Europe/Busingen"`                |
| `EUROPE_CHISINAU`                | `"Europe/Chisinau"`                |
| `EUROPE_COPENHAGEN`              | `"Europe/Copenhagen"`              |
| `EUROPE_DUBLIN`                  | `"Europe/Dublin"`                  |
| `EUROPE_GIBRALTAR`               | `"Europe/Gibraltar"`               |
| `EUROPE_GUERNSEY`                | `"Europe/Guernsey"`                |
| `EUROPE_HELSINKI`                | `"Europe/Helsinki"`                |
| `EUROPE_ISLE_OF_MAN`             | `"Europe/Isle_of_Man"`             |
| `EUROPE_ISTANBUL`                | `"Europe/Istanbul"`                |
| `EUROPE_JERSEY`                  | `"Europe/Jersey"`                  |
| `EUROPE_KALININGRAD`             | `"Europe/Kaliningrad"`             |
| `EUROPE_KIEV`                    | `"Europe/Kiev"`                    |
| `EUROPE_KIROV`                   | `"Europe/Kirov"`                   |
| `EUROPE_LISBON`                  | `"Europe/Lisbon"`                  |
| `EUROPE_LJUBLJANA`               | `"Europe/Ljubljana"`               |
| `EUROPE_LONDON`                  | `"Europe/London"`                  |
| `EUROPE_LUXEMBOURG`              | `"Europe/Luxembourg"`              |
| `EUROPE_MADRID`                  | `"Europe/Madrid"`                  |
| `EUROPE_MALTA`                   | `"Europe/Malta"`                   |
| `EUROPE_MARIEHAMN`               | `"Europe/Mariehamn"`               |
| `EUROPE_MINSK`                   | `"Europe/Minsk"`                   |
| `EUROPE_MONACO`                  | `"Europe/Monaco"`                  |
| `EUROPE_MOSCOW`                  | `"Europe/Moscow"`                  |
| `EUROPE_NICOSIA`                 | `"Europe/Nicosia"`                 |
| `EUROPE_OSLO`                    | `"Europe/Oslo"`                    |
| `EUROPE_PARIS`                   | `"Europe/Paris"`                   |
| `EUROPE_PODGORICA`               | `"Europe/Podgorica"`               |
| `EUROPE_PRAGUE`                  | `"Europe/Prague"`                  |
| `EUROPE_RIGA`                    | `"Europe/Riga"`                    |
| `EUROPE_ROME`                    | `"Europe/Rome"`                    |
| `EUROPE_SAMARA`                  | `"Europe/Samara"`                  |
| `EUROPE_SAN_MARINO`              | `"Europe/San_Marino"`              |
| `EUROPE_SARAJEVO`                | `"Europe/Sarajevo"`                |
| `EUROPE_SARATOV`                 | `"Europe/Saratov"`                 |
| `EUROPE_SIMFEROPOL`              | `"Europe/Simferopol"`              |
| `EUROPE_SKOPJE`                  | `"Europe/Skopje"`                  |
| `EUROPE_SOFIA`                   | `"Europe/Sofia"`                   |
| `EUROPE_STOCKHOLM`               | `"Europe/Stockholm"`               |
| `EUROPE_TALLINN`                 | `"Europe/Tallinn"`                 |
| `EUROPE_TIRANE`                  | `"Europe/Tirane"`                  |
| `EUROPE_ULYANOVSK`               | `"Europe/Ulyanovsk"`               |
| `EUROPE_UZHGOROD`                | `"Europe/Uzhgorod"`                |
| `EUROPE_VADUZ`                   | `"Europe/Vaduz"`                   |
| `EUROPE_VATICAN`                 | `"Europe/Vatican"`                 |
| `EUROPE_VIENNA`                  | `"Europe/Vienna"`                  |
| `EUROPE_VILNIUS`                 | `"Europe/Vilnius"`                 |
| `EUROPE_VOLGOGRAD`               | `"Europe/Volgograd"`               |
| `EUROPE_WARSAW`                  | `"Europe/Warsaw"`                  |
| `EUROPE_ZAGREB`                  | `"Europe/Zagreb"`                  |
| `EUROPE_ZAPOROZHYE`              | `"Europe/Zaporozhye"`              |
| `EUROPE_ZURICH`                  | `"Europe/Zurich"`                  |
| `INDIAN_ANTANANARIVO`            | `"Indian/Antananarivo"`            |
| `INDIAN_CHAGOS`                  | `"Indian/Chagos"`                  |
| `INDIAN_CHRISTMAS`               | `"Indian/Christmas"`               |
| `INDIAN_COCOS`                   | `"Indian/Cocos"`                   |
| `INDIAN_COMORO`                  | `"Indian/Comoro"`                  |
| `INDIAN_KERGUELEN`               | `"Indian/Kerguelen"`               |
| `INDIAN_MAHE`                    | `"Indian/Mahe"`                    |
| `INDIAN_MALDIVES`                | `"Indian/Maldives"`                |
| `INDIAN_MAURITIUS`               | `"Indian/Mauritius"`               |
| `INDIAN_MAYOTTE`                 | `"Indian/Mayotte"`                 |
| `INDIAN_REUNION`                 | `"Indian/Reunion"`                 |
| `PACIFIC_APIA`                   | `"Pacific/Apia"`                   |
| `PACIFIC_AUCKLAND`               | `"Pacific/Auckland"`               |
| `PACIFIC_BOUGAINVILLE`           | `"Pacific/Bougainville"`           |
| `PACIFIC_CHATHAM`                | `"Pacific/Chatham"`                |
| `PACIFIC_CHUUK`                  | `"Pacific/Chuuk"`                  |
| `PACIFIC_EASTER`                 | `"Pacific/Easter"`                 |
| `PACIFIC_EFATE`                  | `"Pacific/Efate"`                  |
| `PACIFIC_ENDERBURY`              | `"Pacific/Enderbury"`              |
| `PACIFIC_FAKAOFO`                | `"Pacific/Fakaofo"`                |
| `PACIFIC_FIJI`                   | `"Pacific/Fiji"`                   |
| `PACIFIC_FUNAFUTI`               | `"Pacific/Funafuti"`               |
| `PACIFIC_GALAPAGOS`              | `"Pacific/Galapagos"`              |
| `PACIFIC_GAMBIER`                | `"Pacific/Gambier"`                |
| `PACIFIC_GUADALCANAL`            | `"Pacific/Guadalcanal"`            |
| `PACIFIC_GUAM`                   | `"Pacific/Guam"`                   |
| `PACIFIC_HONOLULU`               | `"Pacific/Honolulu"`               |
| `PACIFIC_KANTON`                 | `"Pacific/Kanton"`                 |
| `PACIFIC_KIRITIMATI`             | `"Pacific/Kiritimati"`             |
| `PACIFIC_KOSRAE`                 | `"Pacific/Kosrae"`                 |
| `PACIFIC_KWAJALEIN`              | `"Pacific/Kwajalein"`              |
| `PACIFIC_MAJURO`                 | `"Pacific/Majuro"`                 |
| `PACIFIC_MARQUESAS`              | `"Pacific/Marquesas"`              |
| `PACIFIC_MIDWAY`                 | `"Pacific/Midway"`                 |
| `PACIFIC_NAURU`                  | `"Pacific/Nauru"`                  |
| `PACIFIC_NIUE`                   | `"Pacific/Niue"`                   |
| `PACIFIC_NORFOLK`                | `"Pacific/Norfolk"`                |
| `PACIFIC_NOUMEA`                 | `"Pacific/Noumea"`                 |
| `PACIFIC_PAGO_PAGO`              | `"Pacific/Pago_Pago"`              |
| `PACIFIC_PALAU`                  | `"Pacific/Palau"`                  |
| `PACIFIC_PITCAIRN`               | `"Pacific/Pitcairn"`               |
| `PACIFIC_POHNPEI`                | `"Pacific/Pohnpei"`                |
| `PACIFIC_PORT_MORESBY`           | `"Pacific/Port_Moresby"`           |
| `PACIFIC_RAROTONGA`              | `"Pacific/Rarotonga"`              |
| `PACIFIC_SAIPAN`                 | `"Pacific/Saipan"`                 |
| `PACIFIC_TAHITI`                 | `"Pacific/Tahiti"`                 |
| `PACIFIC_TARAWA`                 | `"Pacific/Tarawa"`                 |
| `PACIFIC_TONGATAPU`              | `"Pacific/Tongatapu"`              |
| `PACIFIC_WAKE`                   | `"Pacific/Wake"`                   |
| `PACIFIC_WALLIS`                 | `"Pacific/Wallis"`                 |
| `UTC`                            | `"utc"`                            |

***

### UpdateType

When updating records, the type specifies how data are updated.

#### Enumeration Members

| Enumeration Member | Value     | Description                                                                  |
| ------------------ | --------- | ---------------------------------------------------------------------------- |
| `FULL`             | `"PUT"`   | Will update the included fields and clear all unincluded fields.             |
| `PARTIAL`          | `"PATCH"` | Will only update the included fields. Fields not included will be unchanged. |

***

### UserLocale

The user locale that should be used to format dates when using `string` as the [CellFormat](README.md#cellformat).

#### Enumeration Members

| Enumeration Member                     | Value        |
| -------------------------------------- | ------------ |
| `AFRIKAANS`                            | `"af"`       |
| `ALBANIAN`                             | `"sq"`       |
| `ARABIC`                               | `"ar"`       |
| `ARABIC_SAUDI_ARABIA`                  | `"ar-sa"`    |
| `ARMENIAN`                             | `"hy-am"`    |
| `AUSTRALIAN_ENGLISH`                   | `"en-au"`    |
| `AUSTRIAN_GERMAN`                      | `"de-at"`    |
| `AZERBAIJANI`                          | `"az"`       |
| `BAHASA_INDONESIA`                     | `"id"`       |
| `BAHASA_MALAYSIA`                      | `"ms"`       |
| `BELARUSIAN`                           | `"be"`       |
| `BENGALI`                              | `"bn"`       |
| `BOSNIAN`                              | `"bs"`       |
| `BOSO_JOWO`                            | `"jv"`       |
| `BRAZILIAN_PORTUGUESE`                 | `"pt-br"`    |
| `BRETON`                               | `"br"`       |
| `BRITISH_ENGLISH`                      | `"en-gb"`    |
| `BULGARIAN`                            | `"bg"`       |
| `BURMESE`                              | `"my"`       |
| `CANADIAN_ENGLISH`                     | `"en-ca"`    |
| `CANADIAN_FRENCH`                      | `"fr-ca"`    |
| `CATALAN`                              | `"ca"`       |
| `CHUVASH`                              | `"cv"`       |
| `CZECH`                                | `"cs"`       |
| `DANISH`                               | `"da"`       |
| `DUTCH`                                | `"nl"`       |
| `ENGLISH`                              | `"en-us"`    |
| `ESPERANTO`                            | `"eo"`       |
| `ESTONIAN`                             | `"et"`       |
| `EUSKARA`                              | `"eu"`       |
| `FAROESE`                              | `"fo"`       |
| `FINNISH`                              | `"fi"`       |
| `FRENCH`                               | `"fr"`       |
| `FRISIAN`                              | `"fy"`       |
| `GALICIAN`                             | `"gl"`       |
| `GEORGIAN`                             | `"ka"`       |
| `GERMAN`                               | `"de"`       |
| `HEBREW`                               | `"he"`       |
| `HINDI`                                | `"hi"`       |
| `HRVATSKI`                             | `"hr"`       |
| `HUNGARIAN`                            | `"hu"`       |
| `ICELANDIC`                            | `"is"`       |
| `IRISH_ENGLISH`                        | `"en-ie"`    |
| `ITALIAN`                              | `"it"`       |
| `JAPANESE`                             | `"ja"`       |
| `KHMER`                                | `"km"`       |
| `KOREAN`                               | `"ko"`       |
| `LATVIAN`                              | `"lv"`       |
| `LITHUANIAN`                           | `"lt"`       |
| `LUXEMBOURGISH`                        | `"lb"`       |
| `MACEDONIAN`                           | `"mk"`       |
| `MALAYALAM`                            | `"ml"`       |
| `MARATHI`                              | `"mr"`       |
| `MODERN_GREEK`                         | `"el"`       |
| `MONTENEGRIN`                          | `"me"`       |
| `MOROCCAN_ARABIC`                      | `"ar-ma"`    |
| `MOROCCO_CENTRAL_ATLAS_TAMAZIYT_LATIN` | `"tzm_latn"` |
| `MOROCCO_CENTRAL_ATLAS_TAMAZIƔT`       | `"tzm"`      |
| `NEPALI`                               | `"ne"`       |
| `NEW_ZEALAND_ENGLISH`                  | `"en-nz"`    |
| `NORWEGIAN_BOKMAL`                     | `"nb"`       |
| `NORWEGIAN_NYNORSK`                    | `"nn"`       |
| `PERSIAN`                              | `"fa"`       |
| `POLISH`                               | `"pl"`       |
| `PORTUGUESE`                           | `"pt"`       |
| `ROMANIAN`                             | `"ro"`       |
| `RUSSIAN`                              | `"ru"`       |
| `SERBIAN_CYRILLIC`                     | `"sr-cyrl"`  |
| `SERBIAN_LATIN`                        | `"sr"`       |
| `SIMPLIFIED_CHINESE`                   | `"zh-cn"`    |
| `SINHALA`                              | `"si"`       |
| `SLOVAK`                               | `"sk"`       |
| `SLOVENIAN`                            | `"sl"`       |
| `SPANISH`                              | `"es"`       |
| `SWEDISH`                              | `"sv"`       |
| `SWISS_FRENCH`                         | `"fr-ch"`    |
| `TAGALOG_FILIPINO`                     | `"tl-ph"`    |
| `TALOSSAN`                             | `"tzl"`      |
| `TAMIL`                                | `"ta"`       |
| `THAI`                                 | `"th"`       |
| `TIBETAN`                              | `"bo"`       |
| `TRADITIONAL_CHINESE`                  | `"zh-tw"`    |
| `TUNISIAN_ARABIC`                      | `"ar-tn"`    |
| `TURKISH`                              | `"tr"`       |
| `UKRAINIAN`                            | `"uk"`       |
| `UZBEK`                                | `"uz"`       |
| `VIETNAMESE`                           | `"vi"`       |
| `WELSH`                                | `"cy"`       |

## Classes

### AirtableClient

Client for interacting with Airtable.

This client will handle and throttle requests to ensure that users will not overstep the rate limits set by Airtable.

#### Constructors

##### new AirtableClient()

> **new AirtableClient**(`apiToken`, `requestOptions`): [`AirtableClient`](README.md#airtableclient)

Create a new instance.

###### Parameters

| Parameter                             | Type                                              | Description                                                                                                                                                                                  |
| ------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiToken`                            | `string`                                          | Token to use to interact with Airtable.                                                                                                                                                      |
| `requestOptions`                      | `object`                                          | Allows user to override configurations of the underlying `fetch` function.                                                                                                                   |
| `requestOptions.baseURL`?             | `string`                                          | -                                                                                                                                                                                            |
| `requestOptions.body`?                | `null` \| `BodyInit` \| `Record`<`string`, `any`> | -                                                                                                                                                                                            |
| `requestOptions.cache`?               | `RequestCache`                                    | A string indicating how the request will interact with the browser's cache to set request's cache.                                                                                           |
| `requestOptions.credentials`?         | `RequestCredentials`                              | A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.                                     |
| `requestOptions.duplex`?              | `"half"`                                          | **`Experimental`** Set to "half" to enable duplex streaming. Will be automatically set to "half" when using a ReadableStream as body. <https://fetch.spec.whatwg.org/#enumdef-requestduplex> |
| `requestOptions.headers`?             | `HeadersInit`                                     | A Headers object, an object literal, or an array of two-item arrays to set request's headers.                                                                                                |
| `requestOptions.ignoreResponseError`? | `boolean`                                         | -                                                                                                                                                                                            |
| `requestOptions.integrity`?           | `string`                                          | A cryptographic hash of the resource to be fetched by request. Sets request's integrity.                                                                                                     |
| `requestOptions.keepalive`?           | `boolean`                                         | A boolean to set request's keepalive.                                                                                                                                                        |
| `requestOptions.method`?              | `string`                                          | A string to set request's method.                                                                                                                                                            |
| `requestOptions.mode`?                | `RequestMode`                                     | A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.                                                                      |
| `requestOptions.params`?              | `Record`<`string`, `any`>                         | -                                                                                                                                                                                            |
| `requestOptions.parseResponse`?       | (`responseText`) => `any`                         | -                                                                                                                                                                                            |
| `requestOptions.priority`?            | `RequestPriority`                                 | -                                                                                                                                                                                            |
| `requestOptions.query`?               | `Record`<`string`, `any`>                         | -                                                                                                                                                                                            |
| `requestOptions.redirect`?            | `RequestRedirect`                                 | A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.            |
| `requestOptions.referrer`?            | `string`                                          | A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.                                                                                   |
| `requestOptions.referrerPolicy`?      | `ReferrerPolicy`                                  | A referrer policy to set request's referrerPolicy.                                                                                                                                           |
| `requestOptions.responseType`?        | `ResponseType`                                    | -                                                                                                                                                                                            |
| `requestOptions.retry`?               | `number` \| `false`                               | -                                                                                                                                                                                            |
| `requestOptions.retryDelay`?          | `number`                                          | Delay between retries in milliseconds.                                                                                                                                                       |
| `requestOptions.retryStatusCodes`?    | `number`\[]                                       | Default is \[408, 409, 425, 429, 500, 502, 503, 504]                                                                                                                                         |
| `requestOptions.signal`?              | `null` \| `AbortSignal`                           | An AbortSignal to set request's signal.                                                                                                                                                      |
| `requestOptions.timeout`?             | `number`                                          | timeout in milliseconds                                                                                                                                                                      |
| `requestOptions.window`?              | `null`                                            | Can only be null. Used to disassociate request from any Window.                                                                                                                              |
| `requestOptions.onRequest`?           | -                                                 |                                                                                                                                                                                              |
| `requestOptions.onRequestError`?      | -                                                 |                                                                                                                                                                                              |
| `requestOptions.onResponse`?          | -                                                 |                                                                                                                                                                                              |
| `requestOptions.onResponseError`?     | -                                                 |                                                                                                                                                                                              |

###### Returns

[`AirtableClient`](README.md#airtableclient)

###### Defined in

packages/client-airtable/src/client.ts:53

#### Methods

##### createRecords()

> **createRecords**<`RequestFields`, `ResponseFields`>(`request`): `Promise`<{`records`: {`createdTime`: `Date`;`fields`: `ResponseFields`;`id`: `string`; }\[]; }>

Create new records.

###### Type Parameters

| Type Parameter                                           | Default type    | Description                                                                        |
| -------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------- |
| `RequestFields` *extends* `Record`<`string`, `unknown`>  | -               | The fields to set when creating the records.                                       |
| `ResponseFields` *extends* `Record`<`string`, `unknown`> | `RequestFields` | The fields returned after creation, usually should just match the `RequestFields`. |

###### Parameters

| Parameter                        | Type                                     | Description                                                                                                                                                                                                                                                             |
| -------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`                        | `object`                                 | Refer to [CreateRecordsRequest](README.md#createrecordsrequestfields).                                                                                                                                                                                                  |
| `request.baseId`                 | `string`                                 | Identifier for the base.                                                                                                                                                                                                                                                |
| `request.records`                | \[`RequestFields`, `...RequestFields[]`] | Records to create. Maximum of 10.                                                                                                                                                                                                                                       |
| `request.returnFieldsByFieldId`? | `boolean`                                | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                |
| `request.tableIdOrName`          | `string`                                 | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                      |
| `request.typecast`?              | `boolean`                                | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |

###### Returns

`Promise`<{`records`: {`createdTime`: `Date`;`fields`: `ResponseFields`;`id`: `string`; }\[]; }>

Refer to [CreateRecordsResponse](README.md#createrecordsresponsefields).

| Name      | Type                                                                   | Description                                                                                   |
| --------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `records` | {`createdTime`: `Date`;`fields`: `ResponseFields`;`id`: `string`; }\[] | The records that were created. Refer to [IndividualRecord](README.md#individualrecordfields). |

###### Defined in

packages/client-airtable/src/client.ts:84

##### deleteRecords()

> **deleteRecords**(`request`): `Promise`<{`records`: {`deleted`: `boolean`;`id`: `string`; }\[]; }>

Delete records.

###### Parameters

| Parameter               | Type        | Description                                                                        |
| ----------------------- | ----------- | ---------------------------------------------------------------------------------- |
| `request`               | `object`    | Refer to [DeleteRecordsRequest](README.md#deleterecordsrequest).                   |
| `request.baseId`        | `string`    | Identifier for the base.                                                           |
| `request.records`       | `string`\[] | List of record IDs to delete. Maximum of 10.                                       |
| `request.tableIdOrName` | `string`    | Identifier or name for the table. Preference is to use the ID which is unchanging. |

###### Returns

`Promise`<{`records`: {`deleted`: `boolean`;`id`: `string`; }\[]; }>

Refer to [DeleteRecordsResponse](README.md#deleterecordsresponse).

| Name      | Type                                       | Description                            |
| --------- | ------------------------------------------ | -------------------------------------- |
| `records` | {`deleted`: `boolean`;`id`: `string`; }\[] | List of records that has been deleted. |

###### Defined in

packages/client-airtable/src/client.ts:96

##### getRecord()

> **getRecord**<`Fields`>(`request`): `Promise`<[`IndividualRecord`](README.md#individualrecordfields)<`Fields`>>

Get a record.

###### Type Parameters

| Type Parameter                                   |
| ------------------------------------------------ |
| `Fields` *extends* `Record`<`string`, `unknown`> |

###### Parameters

| Parameter                        | Type                                 | Description                                                                                                                                                              |
| -------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                        | `object`                             | Refer to [GetRecordRequest](README.md#getrecordrequest).                                                                                                                 |
| `request.baseId`                 | `string`                             | Identifier for the base.                                                                                                                                                 |
| `request.cellFormat`?            | [`CellFormat`](README.md#cellformat) | The format that should be used for cell values. Defaults to [CellFormat.JSON](README.md#cellformat).                                                                     |
| `request.recordId`               | `string`                             | Identifier for the record.                                                                                                                                               |
| `request.returnFieldsByFieldId`? | `boolean`                            | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name. |
| `request.tableIdOrName`          | `string`                             | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                       |
| `request.timeZone`?              | [`Timezone`](README.md#timezone)     | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.           |
| `request.userLocale`?            | [`UserLocale`](README.md#userlocale) | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.         |

###### Returns

`Promise`<[`IndividualRecord`](README.md#individualrecordfields)<`Fields`>>

Refer to [IndividualRecord](README.md#individualrecordfields).

###### Defined in

packages/client-airtable/src/client.ts:108

##### listRecords()

> **listRecords**<`Fields`>(`request`): `Promise`<{`offset`: `string`;`records`: [`IndividualRecord`](README.md#individualrecordfields)<`Fields`> & {`commentCount`: `number`; }\[]; }>

Search for records based on given criterias.

###### Type Parameters

| Type Parameter                                   |
| ------------------------------------------------ |
| `Fields` *extends* `Record`<`string`, `unknown`> |

###### Parameters

| Parameter                        | Type                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`                        | `object`                                                                                    | Refer to [ListRecordsRequest](README.md#listrecordsrequestfields).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `request.baseId`                 | `string`                                                                                    | Identifier for the base.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `request.cellFormat`?            | [`CellFormat`](README.md#cellformat)                                                        | The format that should be used for cell values. Defaults to [CellFormat.JSON](README.md#cellformat).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `request.fields`?                | [`UnionToTuple`](README.md#uniontotupleur)<\`${Extract\<keyof Fields, string \| number>}\`> | Only data for fields whose names or IDs are in this list will be included in the result. If you don't need every field, you can use this parameter to reduce the amount of data transferred. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit.                                                                                                                                                                                                                                                                                        |
| `request.filterByFormula`?       | `string`                                                                                    | A formula used to filter records. The formula will be evaluated for each record, and if the result is not `0`, `false`, \`\`, `NaN`, `[]`, or `#Error!` the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request. If combined with the `view` parameter, only records in that view which satisfy the formula will be returned. Formulas can use field names, or field id's inside of the formula. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. |
| `request.maxRecords`?            | `number`                                                                                    | The maximum total number of records that will be returned in your requests. If this value is larger than `pageSize` (which is 100 by default), you may have to load multiple pages to reach this total.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `request.offset`?                | `string`                                                                                    | To fetch the next page of records, include offset from the previous request in the next request's parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `request.pageSize`?              | `number`                                                                                    | The number of records returned in each request. Must be less than or equal to 100. Default is 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `request.recordMetadata`?        | `"commentCount"`\[]                                                                         | An optional field that, if specified, includes commentCount on each record returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `request.returnFieldsByFieldId`? | `boolean`                                                                                   | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `request.sort`?                  | {`direction`: [`Direction`](README.md#direction);`field`: `string`; }\[]                    | A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key specifying the name of the field to sort on, and an optional direction key that is either `asc` or `desc`. The default direction is `asc`. The sort parameter overrides the sorting of the view specified in the view parameter. If neither the sort nor the view parameter is included, the order of records is arbitrary.                                                                                                                                                                                              |
| `request.tableIdOrName`          | `string`                                                                                    | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `request.timeZone`?              | [`Timezone`](README.md#timezone)                                                            | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `request.typecast`?              | `boolean`                                                                                   | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.                                                                                                                                                                                                                                                                                                                                                                |
| `request.userLocale`?            | [`UserLocale`](README.md#userlocale)                                                        | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `request.view`?                  | `string`                                                                                    | The name or ID of a view in the table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view unless the `sort` parameter is included, which overrides that order. Fields hidden in this view will be returned in the results. To only return a subset of fields, use the `fields` parameter.                                                                                                                                                                                                                                                                           |

###### Returns

`Promise`<{`offset`: `string`;`records`: [`IndividualRecord`](README.md#individualrecordfields)<`Fields`> & {`commentCount`: `number`; }\[]; }>

Refer to [ListRecordsResponse](README.md#listrecordsresponsefields).

| Name      | Type                                                                                               | Description                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `offset`  | `string`                                                                                           | If there are more records, the response will contain an offset. Pass this offset into the next request to fetch the next page of records. |
| `records` | [`IndividualRecord`](README.md#individualrecordfields)<`Fields`> & {`commentCount`: `number`; }\[] | Refer to [IndividualRecord](README.md#individualrecordfields).                                                                            |

###### Defined in

packages/client-airtable/src/client.ts:120

## Interfaces

### CreateRecordsRequest\<Fields>

Request data for creating records.

#### Type Parameters

| Type Parameter                                              |
| ----------------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) |

#### Properties

| Property                 | Type                       | Description                                                                                                                                                                                                                                                             |
| ------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseId`                 | `string`                   | Identifier for the base.                                                                                                                                                                                                                                                |
| `records`                | \[`Fields`, `...Fields[]`] | Records to create. Maximum of 10.                                                                                                                                                                                                                                       |
| `returnFieldsByFieldId?` | `boolean`                  | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                |
| `tableIdOrName`          | `string`                   | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                      |
| `typecast?`              | `boolean`                  | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |

***

### CreateRecordsResponse\<Fields>

Response for endpoint that create records.

#### Type Parameters

| Type Parameter                                              |
| ----------------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) |

#### Properties

| Property  | Type                                                           | Description                                                                                   |
| --------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `records` | {`createdTime`: `Date`;`fields`: `Fields`;`id`: `string`; }\[] | The records that were created. Refer to [IndividualRecord](README.md#individualrecordfields). |

***

### DeleteRecordsRequest

Request data for deleting records.

#### Properties

| Property        | Type        | Description                                                                        |
| --------------- | ----------- | ---------------------------------------------------------------------------------- |
| `baseId`        | `string`    | Identifier for the base.                                                           |
| `records`       | `string`\[] | List of record IDs to delete. Maximum of 10.                                       |
| `tableIdOrName` | `string`    | Identifier or name for the table. Preference is to use the ID which is unchanging. |

***

### DeleteRecordsResponse

Response data after deleting records.

#### Properties

| Property  | Type                                       | Description                            |
| --------- | ------------------------------------------ | -------------------------------------- |
| `records` | {`deleted`: `boolean`;`id`: `string`; }\[] | List of records that has been deleted. |

***

### GetRecordRequest

Request data for getting the details of a single record.

#### Properties

| Property                 | Type                                 | Description                                                                                                                                                              |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `baseId`                 | `string`                             | Identifier for the base.                                                                                                                                                 |
| `cellFormat?`            | [`CellFormat`](README.md#cellformat) | The format that should be used for cell values. Defaults to [CellFormat.JSON](README.md#cellformat).                                                                     |
| `recordId`               | `string`                             | Identifier for the record.                                                                                                                                               |
| `returnFieldsByFieldId?` | `boolean`                            | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name. |
| `tableIdOrName`          | `string`                             | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                       |
| `timeZone?`              | [`Timezone`](README.md#timezone)     | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.           |
| `userLocale?`            | [`UserLocale`](README.md#userlocale) | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.         |

***

### IndividualRecord\<Fields>

An individual record.

#### Type Parameters

| Type Parameter                                              |
| ----------------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) |

#### Properties

| Property      | Type     | Description                                   |
| ------------- | -------- | --------------------------------------------- |
| `createdTime` | `Date`   | Date and time of when the record was created. |
| `fields`      | `Fields` | Fields of the records.                        |
| `id`          | `string` | Identifier for the record.                    |

***

### ListRecordsRequest\<Fields>

Data for fetching the list of records.

#### Type Parameters

| Type Parameter              | Description                                  |
| --------------------------- | -------------------------------------------- |
| `Fields` *extends* `string` | Name of fields to include in resulting data. |

#### Properties

| Property                 | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseId`                 | `string`                                                                 | Identifier for the base.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `cellFormat?`            | [`CellFormat`](README.md#cellformat)                                     | The format that should be used for cell values. Defaults to [CellFormat.JSON](README.md#cellformat).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `fields?`                | [`UnionToTuple`](README.md#uniontotupleur)<`Fields`>                     | Only data for fields whose names or IDs are in this list will be included in the result. If you don't need every field, you can use this parameter to reduce the amount of data transferred. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit.                                                                                                                                                                                                                                                                                        |
| `filterByFormula?`       | `string`                                                                 | A formula used to filter records. The formula will be evaluated for each record, and if the result is not `0`, `false`, \`\`, `NaN`, `[]`, or `#Error!` the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request. If combined with the `view` parameter, only records in that view which satisfy the formula will be returned. Formulas can use field names, or field id's inside of the formula. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. |
| `maxRecords?`            | `number`                                                                 | The maximum total number of records that will be returned in your requests. If this value is larger than `pageSize` (which is 100 by default), you may have to load multiple pages to reach this total.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `offset?`                | `string`                                                                 | To fetch the next page of records, include offset from the previous request in the next request's parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `pageSize?`              | `number`                                                                 | The number of records returned in each request. Must be less than or equal to 100. Default is 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `recordMetadata?`        | `"commentCount"`\[]                                                      | An optional field that, if specified, includes commentCount on each record returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `returnFieldsByFieldId?` | `boolean`                                                                | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sort?`                  | {`direction`: [`Direction`](README.md#direction);`field`: `string`; }\[] | A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key specifying the name of the field to sort on, and an optional direction key that is either `asc` or `desc`. The default direction is `asc`. The sort parameter overrides the sorting of the view specified in the view parameter. If neither the sort nor the view parameter is included, the order of records is arbitrary.                                                                                                                                                                                              |
| `tableIdOrName`          | `string`                                                                 | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `timeZone?`              | [`Timezone`](README.md#timezone)                                         | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecast?`              | `boolean`                                                                | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.                                                                                                                                                                                                                                                                                                                                                                |
| `userLocale?`            | [`UserLocale`](README.md#userlocale)                                     | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `view?`                  | `string`                                                                 | The name or ID of a view in the table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view unless the `sort` parameter is included, which overrides that order. Fields hidden in this view will be returned in the results. To only return a subset of fields, use the `fields` parameter.                                                                                                                                                                                                                                                                           |

***

### ListRecordsResponse\<Fields>

Response data for the records that were requested.

#### Type Parameters

| Type Parameter                                              | Description                                |
| ----------------------------------------------------------- | ------------------------------------------ |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) | Mapping of fields to return to their type. |

#### Properties

| Property  | Type                                                                                               | Description                                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `offset?` | `string`                                                                                           | If there are more records, the response will contain an offset. Pass this offset into the next request to fetch the next page of records. |
| `records` | [`IndividualRecord`](README.md#individualrecordfields)<`Fields`> & {`commentCount`: `number`; }\[] | Refer to [IndividualRecord](README.md#individualrecordfields).                                                                            |

***

### UpdateRecordsRequestNonUpsert\<Fields>

Request data for updating records.

#### Type Parameters

| Type Parameter                                              |
| ----------------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) |

#### Properties

| Property                 | Type                                                    | Description                                                                                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseId`                 | `string`                                                | Identifier for the base.                                                                                                                                                                                                                                                |
| `method`                 | [`UpdateType`](README.md#updatetype)                    | Method to use when updating data.                                                                                                                                                                                                                                       |
| `records`                | \[{`fields`: `Fields`;`id`: `string`; }, `...Object[]`] | List of records to update. Max of 10.                                                                                                                                                                                                                                   |
| `returnFieldsByFieldId?` | `boolean`                                               | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                |
| `tableIdOrName`          | `string`                                                | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                      |
| `typecast?`              | `boolean`                                               | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |

***

### UpdateRecordsRequestUpsert\<Fields>

Request data for upserting records.

#### Type Parameters

| Type Parameter                                              |
| ----------------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) |

#### Properties

| Property                        | Type                                     | Description                                                                                                                                                                                                                                                                       |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `baseId`                        | `string`                                 | Identifier for the base.                                                                                                                                                                                                                                                          |
| `method`                        | [`UpdateType`](README.md#updatetype)     | Method to use when updating data.                                                                                                                                                                                                                                                 |
| `performUpsert`                 | {`fieldsToMergeOn`: `string`\[]; }       | Enables upsert behavior when set. `fieldsToMergeOn` will be used as an external ID to match records for updates. For records where no match is found, a new Airtable record will be created.                                                                                      |
| `performUpsert.fieldsToMergeOn` | `string`\[]                              | An array with at least one and at most three field names or IDs. IDs must uniquely identify a single record. These cannot be computed fields (formulas, lookups, rollups), and must be one of the following types: number, text, long text, single select, multiple select, date. |
| `records`                       | \[{`fields`: `Fields`; }, `...Object[]`] | List of records to update. Max of 10.                                                                                                                                                                                                                                             |
| `returnFieldsByFieldId?`        | `boolean`                                | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                          |
| `tableIdOrName`                 | `string`                                 | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                                |
| `typecast?`                     | `boolean`                                | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.           |

***

### UpdateRecordsResponseNonUpsert\<Fields>

Response data for updating records.

#### Type Parameters

| Type Parameter                                              |
| ----------------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) |

#### Properties

| Property  | Type                                                                | Description                                                    |
| --------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| `records` | [`IndividualRecord`](README.md#individualrecordfields)<`Fields`>\[] | Refer to [IndividualRecord](README.md#individualrecordfields). |

***

### UpdateRecordsResponseUpsert\<Fields>

Response data for upserting records.

#### Type Parameters

| Type Parameter                                              |
| ----------------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](README.md#recordfields) |

#### Properties

| Property         | Type                                                                | Description                                                    |
| ---------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| `createdRecords` | `string`\[]                                                         | List of identifiers for records that were created.             |
| `records`        | [`IndividualRecord`](README.md#individualrecordfields)<`Fields`>\[] | Refer to [IndividualRecord](README.md#individualrecordfields). |
| `updatedRecords` | `string`\[]                                                         | List of identifiers for records that were updated.             |

## Type Aliases

### RecordFields

> **RecordFields**: `NonEmptyObject`<`Record`<`string`, `unknown`>>

The fields of a record.

#### Defined in

packages/client-airtable/src/records/shared.ts:13

***

### UnionToTuple\<U, R>

> **UnionToTuple**<`U`, `R`>: `{ [S in U]: Exclude<U, S> extends never ? [...R, S] : UnionToTuple<Exclude<U, S>, [...R, S]> }`\[`U`]

Helper type that given a union of strings, produces a type where all the possible options are elements of an array.
Useful to ensure that when a user specify the union, the user provides all those values.

#### Type Parameters

| Type Parameter             | Default type |
| -------------------------- | ------------ |
| `U` *extends* `string`     | -            |
| `R` *extends* `unknown`\[] | \[]          |

#### Defined in

packages/client-airtable/src/records/shared.ts:121

## Variables

### MAXIMUM\_RECORDS\_PER\_BATCH

> `const` **MAXIMUM\_RECORDS\_PER\_BATCH**: `10` = `10`

The maximum number of records that can be updated per batch request.

#### See

* <https://airtable.com/developers/web/api/update-multiple-records>
* <https://airtable.com/developers/web/api/create-records>
* <https://airtable.com/developers/web/api/delete-multiple-records>

#### Defined in

packages/client-airtable/src/constants.ts:8

***

### REQUESTS\_PER\_SECOND\_PER\_ACCESS\_TOKEN

> `const` **REQUESTS\_PER\_SECOND\_PER\_ACCESS\_TOKEN**: `50` = `50`

The maximum number of requests per second per access token.

#### See

<https://airtable.com/developers/web/api/rate-limits>

#### Defined in

packages/client-airtable/src/constants.ts:22

***

### REQUESTS\_PER\_SECOND\_PER\_BASE

> `const` **REQUESTS\_PER\_SECOND\_PER\_BASE**: `5` = `5`

The maximum number of requests per second per base.

#### See

<https://airtable.com/developers/web/api/rate-limits>

#### Defined in

packages/client-airtable/src/constants.ts:15
