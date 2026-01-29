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
    * [CreateRecordsRequest](#createrecordsrequest)
    * [CreateRecordsResponse](#createrecordsresponse)
    * [DeleteRecordsRequest](#deleterecordsrequest)
    * [DeleteRecordsResponse](#deleterecordsresponse)
    * [GetRecordRequest](#getrecordrequest)
    * [IndividualRecord](#individualrecord)
    * [ListRecordsRequest](#listrecordsrequest)
    * [ListRecordsResponse](#listrecordsresponse)
    * [UpdateRecordsRequestNonUpsert](#updaterecordsrequestnonupsert)
    * [UpdateRecordsRequestUpsert](#updaterecordsrequestupsert)
    * [UpdateRecordsResponseNonUpsert](#updaterecordsresponsenonupsert)
    * [UpdateRecordsResponseUpsert](#updaterecordsresponseupsert)
  * [Type Aliases](#type-aliases)
    * [RecordFields](#recordfields)
    * [UnionToTuple](#uniontotuple)
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

Defined in: packages/client-airtable/src/enums.ts:10

The format that should be used for cell values.

The [Timezone](#timezone) and [UserLocale](#userlocale) parameters are required when using `string` as the cell  format.

Note: You should not rely on the format of these strings, as it is subject to change.

The default is `json`.

#### Enumeration Members

| Enumeration Member           | Value      | Description                                                                   |
| ---------------------------- | ---------- | ----------------------------------------------------------------------------- |
| <a id="json"></a> `JSON`     | `"json"`   | Cells will be formatted as JSON, depending on the field type.                 |
| <a id="string"></a> `STRING` | `"string"` | Cells will be formatted as user-facing strings, regardless of the field type. |

***

### Direction

Defined in: packages/client-airtable/src/enums.ts:23

The direction to sort results.

The default is `asc`.

#### Enumeration Members

| Enumeration Member       | Value    | Description               |
| ------------------------ | -------- | ------------------------- |
| <a id="asc"></a> `ASC`   | `"asc"`  | Sort in ascending order.  |
| <a id="desc"></a> `DESC` | `"desc"` | Sort in descending order. |

***

### Timezone

Defined in: packages/client-airtable/src/enums.ts:34

The time zone that should be used to format dates when using `string` as the [CellFormat](#cellformat).

#### Enumeration Members

| Enumeration Member                                                           | Value                              |
| ---------------------------------------------------------------------------- | ---------------------------------- |
| <a id="africa_abidjan"></a> `AFRICA_ABIDJAN`                                 | `"Africa/Abidjan"`                 |
| <a id="africa_accra"></a> `AFRICA_ACCRA`                                     | `"Africa/Accra"`                   |
| <a id="africa_addis_ababa"></a> `AFRICA_ADDIS_ABABA`                         | `"Africa/Addis_Ababa"`             |
| <a id="africa_algiers"></a> `AFRICA_ALGIERS`                                 | `"Africa/Algiers"`                 |
| <a id="africa_asmara"></a> `AFRICA_ASMARA`                                   | `"Africa/Asmara"`                  |
| <a id="africa_bamako"></a> `AFRICA_BAMAKO`                                   | `"Africa/Bamako"`                  |
| <a id="africa_bangui"></a> `AFRICA_BANGUI`                                   | `"Africa/Bangui"`                  |
| <a id="africa_banjul"></a> `AFRICA_BANJUL`                                   | `"Africa/Banjul"`                  |
| <a id="africa_bissau"></a> `AFRICA_BISSAU`                                   | `"Africa/Bissau"`                  |
| <a id="africa_blantyre"></a> `AFRICA_BLANTYRE`                               | `"Africa/Blantyre"`                |
| <a id="africa_brazzaville"></a> `AFRICA_BRAZZAVILLE`                         | `"Africa/Brazzaville"`             |
| <a id="africa_bujumbura"></a> `AFRICA_BUJUMBURA`                             | `"Africa/Bujumbura"`               |
| <a id="africa_cairo"></a> `AFRICA_CAIRO`                                     | `"Africa/Cairo"`                   |
| <a id="africa_casablanca"></a> `AFRICA_CASABLANCA`                           | `"Africa/Casablanca"`              |
| <a id="africa_ceuta"></a> `AFRICA_CEUTA`                                     | `"Africa/Ceuta"`                   |
| <a id="africa_conakry"></a> `AFRICA_CONAKRY`                                 | `"Africa/Conakry"`                 |
| <a id="africa_dakar"></a> `AFRICA_DAKAR`                                     | `"Africa/Dakar"`                   |
| <a id="africa_dar_es_salaam"></a> `AFRICA_DAR_ES_SALAAM`                     | `"Africa/Dar_es_Salaam"`           |
| <a id="africa_djibouti"></a> `AFRICA_DJIBOUTI`                               | `"Africa/Djibouti"`                |
| <a id="africa_douala"></a> `AFRICA_DOUALA`                                   | `"Africa/Douala"`                  |
| <a id="africa_el_aaiun"></a> `AFRICA_EL_AAIUN`                               | `"Africa/El_Aaiun"`                |
| <a id="africa_freetown"></a> `AFRICA_FREETOWN`                               | `"Africa/Freetown"`                |
| <a id="africa_gaborone"></a> `AFRICA_GABORONE`                               | `"Africa/Gaborone"`                |
| <a id="africa_harare"></a> `AFRICA_HARARE`                                   | `"Africa/Harare"`                  |
| <a id="africa_johannesburg"></a> `AFRICA_JOHANNESBURG`                       | `"Africa/Johannesburg"`            |
| <a id="africa_juba"></a> `AFRICA_JUBA`                                       | `"Africa/Juba"`                    |
| <a id="africa_kampala"></a> `AFRICA_KAMPALA`                                 | `"Africa/Kampala"`                 |
| <a id="africa_khartoum"></a> `AFRICA_KHARTOUM`                               | `"Africa/Khartoum"`                |
| <a id="africa_kigali"></a> `AFRICA_KIGALI`                                   | `"Africa/Kigali"`                  |
| <a id="africa_kinshasa"></a> `AFRICA_KINSHASA`                               | `"Africa/Kinshasa"`                |
| <a id="africa_lagos"></a> `AFRICA_LAGOS`                                     | `"Africa/Lagos"`                   |
| <a id="africa_libreville"></a> `AFRICA_LIBREVILLE`                           | `"Africa/Libreville"`              |
| <a id="africa_lome"></a> `AFRICA_LOME`                                       | `"Africa/Lome"`                    |
| <a id="africa_luanda"></a> `AFRICA_LUANDA`                                   | `"Africa/Luanda"`                  |
| <a id="africa_lubumbashi"></a> `AFRICA_LUBUMBASHI`                           | `"Africa/Lubumbashi"`              |
| <a id="africa_lusaka"></a> `AFRICA_LUSAKA`                                   | `"Africa/Lusaka"`                  |
| <a id="africa_malabo"></a> `AFRICA_MALABO`                                   | `"Africa/Malabo"`                  |
| <a id="africa_maputo"></a> `AFRICA_MAPUTO`                                   | `"Africa/Maputo"`                  |
| <a id="africa_maseru"></a> `AFRICA_MASERU`                                   | `"Africa/Maseru"`                  |
| <a id="africa_mbabane"></a> `AFRICA_MBABANE`                                 | `"Africa/Mbabane"`                 |
| <a id="africa_mogadishu"></a> `AFRICA_MOGADISHU`                             | `"Africa/Mogadishu"`               |
| <a id="africa_monrovia"></a> `AFRICA_MONROVIA`                               | `"Africa/Monrovia"`                |
| <a id="africa_nairobi"></a> `AFRICA_NAIROBI`                                 | `"Africa/Nairobi"`                 |
| <a id="africa_ndjamena"></a> `AFRICA_NDJAMENA`                               | `"Africa/Ndjamena"`                |
| <a id="africa_niamey"></a> `AFRICA_NIAMEY`                                   | `"Africa/Niamey"`                  |
| <a id="africa_nouakchott"></a> `AFRICA_NOUAKCHOTT`                           | `"Africa/Nouakchott"`              |
| <a id="africa_ouagadougou"></a> `AFRICA_OUAGADOUGOU`                         | `"Africa/Ouagadougou"`             |
| <a id="africa_porto_novo"></a> `AFRICA_PORTO_NOVO`                           | `"Africa/Porto-Novo"`              |
| <a id="africa_sao_tome"></a> `AFRICA_SAO_TOME`                               | `"Africa/Sao_Tome"`                |
| <a id="africa_tripoli"></a> `AFRICA_TRIPOLI`                                 | `"Africa/Tripoli"`                 |
| <a id="africa_tunis"></a> `AFRICA_TUNIS`                                     | `"Africa/Tunis"`                   |
| <a id="africa_windhoek"></a> `AFRICA_WINDHOEK`                               | `"Africa/Windhoek"`                |
| <a id="america_adak"></a> `AMERICA_ADAK`                                     | `"America/Adak"`                   |
| <a id="america_anchorage"></a> `AMERICA_ANCHORAGE`                           | `"America/Anchorage"`              |
| <a id="america_anguilla"></a> `AMERICA_ANGUILLA`                             | `"America/Anguilla"`               |
| <a id="america_antigua"></a> `AMERICA_ANTIGUA`                               | `"America/Antigua"`                |
| <a id="america_araguaina"></a> `AMERICA_ARAGUAINA`                           | `"America/Araguaina"`              |
| <a id="america_argentina_buenos_aires"></a> `AMERICA_ARGENTINA_BUENOS_AIRES` | `"America/Argentina/Buenos_Aires"` |
| <a id="america_argentina_catamarca"></a> `AMERICA_ARGENTINA_CATAMARCA`       | `"America/Argentina/Catamarca"`    |
| <a id="america_argentina_cordoba"></a> `AMERICA_ARGENTINA_CORDOBA`           | `"America/Argentina/Cordoba"`      |
| <a id="america_argentina_jujuy"></a> `AMERICA_ARGENTINA_JUJUY`               | `"America/Argentina/Jujuy"`        |
| <a id="america_argentina_la_rioja"></a> `AMERICA_ARGENTINA_LA_RIOJA`         | `"America/Argentina/La_Rioja"`     |
| <a id="america_argentina_mendoza"></a> `AMERICA_ARGENTINA_MENDOZA`           | `"America/Argentina/Mendoza"`      |
| <a id="america_argentina_rio_gallegos"></a> `AMERICA_ARGENTINA_RIO_GALLEGOS` | `"America/Argentina/Rio_Gallegos"` |
| <a id="america_argentina_salta"></a> `AMERICA_ARGENTINA_SALTA`               | `"America/Argentina/Salta"`        |
| <a id="america_argentina_san_juan"></a> `AMERICA_ARGENTINA_SAN_JUAN`         | `"America/Argentina/San_Juan"`     |
| <a id="america_argentina_san_luis"></a> `AMERICA_ARGENTINA_SAN_LUIS`         | `"America/Argentina/San_Luis"`     |
| <a id="america_argentina_tucuman"></a> `AMERICA_ARGENTINA_TUCUMAN`           | `"America/Argentina/Tucuman"`      |
| <a id="america_argentina_ushuaia"></a> `AMERICA_ARGENTINA_USHUAIA`           | `"America/Argentina/Ushuaia"`      |
| <a id="america_aruba"></a> `AMERICA_ARUBA`                                   | `"America/Aruba"`                  |
| <a id="america_asuncion"></a> `AMERICA_ASUNCION`                             | `"America/Asuncion"`               |
| <a id="america_atikokan"></a> `AMERICA_ATIKOKAN`                             | `"America/Atikokan"`               |
| <a id="america_bahia"></a> `AMERICA_BAHIA`                                   | `"America/Bahia"`                  |
| <a id="america_bahia_banderas"></a> `AMERICA_BAHIA_BANDERAS`                 | `"America/Bahia_Banderas"`         |
| <a id="america_barbados"></a> `AMERICA_BARBADOS`                             | `"America/Barbados"`               |
| <a id="america_belem"></a> `AMERICA_BELEM`                                   | `"America/Belem"`                  |
| <a id="america_belize"></a> `AMERICA_BELIZE`                                 | `"America/Belize"`                 |
| <a id="america_blanc_sablon"></a> `AMERICA_BLANC_SABLON`                     | `"America/Blanc-Sablon"`           |
| <a id="america_boa_vista"></a> `AMERICA_BOA_VISTA`                           | `"America/Boa_Vista"`              |
| <a id="america_bogota"></a> `AMERICA_BOGOTA`                                 | `"America/Bogota"`                 |
| <a id="america_boise"></a> `AMERICA_BOISE`                                   | `"America/Boise"`                  |
| <a id="america_cambridge_bay"></a> `AMERICA_CAMBRIDGE_BAY`                   | `"America/Cambridge_Bay"`          |
| <a id="america_campo_grande"></a> `AMERICA_CAMPO_GRANDE`                     | `"America/Campo_Grande"`           |
| <a id="america_cancun"></a> `AMERICA_CANCUN`                                 | `"America/Cancun"`                 |
| <a id="america_caracas"></a> `AMERICA_CARACAS`                               | `"America/Caracas"`                |
| <a id="america_cayenne"></a> `AMERICA_CAYENNE`                               | `"America/Cayenne"`                |
| <a id="america_cayman"></a> `AMERICA_CAYMAN`                                 | `"America/Cayman"`                 |
| <a id="america_chicago"></a> `AMERICA_CHICAGO`                               | `"America/Chicago"`                |
| <a id="america_chihuahua"></a> `AMERICA_CHIHUAHUA`                           | `"America/Chihuahua"`              |
| <a id="america_costa_rica"></a> `AMERICA_COSTA_RICA`                         | `"America/Costa_Rica"`             |
| <a id="america_creston"></a> `AMERICA_CRESTON`                               | `"America/Creston"`                |
| <a id="america_cuiaba"></a> `AMERICA_CUIABA`                                 | `"America/Cuiaba"`                 |
| <a id="america_curacao"></a> `AMERICA_CURACAO`                               | `"America/Curacao"`                |
| <a id="america_danmarkshavn"></a> `AMERICA_DANMARKSHAVN`                     | `"America/Danmarkshavn"`           |
| <a id="america_dawson"></a> `AMERICA_DAWSON`                                 | `"America/Dawson"`                 |
| <a id="america_dawson_creek"></a> `AMERICA_DAWSON_CREEK`                     | `"America/Dawson_Creek"`           |
| <a id="america_denver"></a> `AMERICA_DENVER`                                 | `"America/Denver"`                 |
| <a id="america_detroit"></a> `AMERICA_DETROIT`                               | `"America/Detroit"`                |
| <a id="america_dominica"></a> `AMERICA_DOMINICA`                             | `"America/Dominica"`               |
| <a id="america_edmonton"></a> `AMERICA_EDMONTON`                             | `"America/Edmonton"`               |
| <a id="america_eirunepe"></a> `AMERICA_EIRUNEPE`                             | `"America/Eirunepe"`               |
| <a id="america_el_salvador"></a> `AMERICA_EL_SALVADOR`                       | `"America/El_Salvador"`            |
| <a id="america_fort_nelson"></a> `AMERICA_FORT_NELSON`                       | `"America/Fort_Nelson"`            |
| <a id="america_fortaleza"></a> `AMERICA_FORTALEZA`                           | `"America/Fortaleza"`              |
| <a id="america_glace_bay"></a> `AMERICA_GLACE_BAY`                           | `"America/Glace_Bay"`              |
| <a id="america_godthab"></a> `AMERICA_GODTHAB`                               | `"America/Godthab"`                |
| <a id="america_goose_bay"></a> `AMERICA_GOOSE_BAY`                           | `"America/Goose_Bay"`              |
| <a id="america_grand_turk"></a> `AMERICA_GRAND_TURK`                         | `"America/Grand_Turk"`             |
| <a id="america_grenada"></a> `AMERICA_GRENADA`                               | `"America/Grenada"`                |
| <a id="america_guadeloupe"></a> `AMERICA_GUADELOUPE`                         | `"America/Guadeloupe"`             |
| <a id="america_guatemala"></a> `AMERICA_GUATEMALA`                           | `"America/Guatemala"`              |
| <a id="america_guayaquil"></a> `AMERICA_GUAYAQUIL`                           | `"America/Guayaquil"`              |
| <a id="america_guyana"></a> `AMERICA_GUYANA`                                 | `"America/Guyana"`                 |
| <a id="america_halifax"></a> `AMERICA_HALIFAX`                               | `"America/Halifax"`                |
| <a id="america_havana"></a> `AMERICA_HAVANA`                                 | `"America/Havana"`                 |
| <a id="america_hermosillo"></a> `AMERICA_HERMOSILLO`                         | `"America/Hermosillo"`             |
| <a id="america_indiana_indianapolis"></a> `AMERICA_INDIANA_INDIANAPOLIS`     | `"America/Indiana/Indianapolis"`   |
| <a id="america_indiana_knox"></a> `AMERICA_INDIANA_KNOX`                     | `"America/Indiana/Knox"`           |
| <a id="america_indiana_marengo"></a> `AMERICA_INDIANA_MARENGO`               | `"America/Indiana/Marengo"`        |
| <a id="america_indiana_petersburg"></a> `AMERICA_INDIANA_PETERSBURG`         | `"America/Indiana/Petersburg"`     |
| <a id="america_indiana_tell_city"></a> `AMERICA_INDIANA_TELL_CITY`           | `"America/Indiana/Tell_City"`      |
| <a id="america_indiana_vevay"></a> `AMERICA_INDIANA_VEVAY`                   | `"America/Indiana/Vevay"`          |
| <a id="america_indiana_vincennes"></a> `AMERICA_INDIANA_VINCENNES`           | `"America/Indiana/Vincennes"`      |
| <a id="america_indiana_winamac"></a> `AMERICA_INDIANA_WINAMAC`               | `"America/Indiana/Winamac"`        |
| <a id="america_inuvik"></a> `AMERICA_INUVIK`                                 | `"America/Inuvik"`                 |
| <a id="america_iqaluit"></a> `AMERICA_IQALUIT`                               | `"America/Iqaluit"`                |
| <a id="america_jamaica"></a> `AMERICA_JAMAICA`                               | `"America/Jamaica"`                |
| <a id="america_juneau"></a> `AMERICA_JUNEAU`                                 | `"America/Juneau"`                 |
| <a id="america_kentucky_louisville"></a> `AMERICA_KENTUCKY_LOUISVILLE`       | `"America/Kentucky/Louisville"`    |
| <a id="america_kentucky_monticello"></a> `AMERICA_KENTUCKY_MONTICELLO`       | `"America/Kentucky/Monticello"`    |
| <a id="america_kralendijk"></a> `AMERICA_KRALENDIJK`                         | `"America/Kralendijk"`             |
| <a id="america_la_paz"></a> `AMERICA_LA_PAZ`                                 | `"America/La_Paz"`                 |
| <a id="america_lima"></a> `AMERICA_LIMA`                                     | `"America/Lima"`                   |
| <a id="america_los_angeles"></a> `AMERICA_LOS_ANGELES`                       | `"America/Los_Angeles"`            |
| <a id="america_lower_princes"></a> `AMERICA_LOWER_PRINCES`                   | `"America/Lower_Princes"`          |
| <a id="america_maceio"></a> `AMERICA_MACEIO`                                 | `"America/Maceio"`                 |
| <a id="america_managua"></a> `AMERICA_MANAGUA`                               | `"America/Managua"`                |
| <a id="america_manaus"></a> `AMERICA_MANAUS`                                 | `"America/Manaus"`                 |
| <a id="america_marigot"></a> `AMERICA_MARIGOT`                               | `"America/Marigot"`                |
| <a id="america_martinique"></a> `AMERICA_MARTINIQUE`                         | `"America/Martinique"`             |
| <a id="america_matamoros"></a> `AMERICA_MATAMOROS`                           | `"America/Matamoros"`              |
| <a id="america_mazatlan"></a> `AMERICA_MAZATLAN`                             | `"America/Mazatlan"`               |
| <a id="america_menominee"></a> `AMERICA_MENOMINEE`                           | `"America/Menominee"`              |
| <a id="america_merida"></a> `AMERICA_MERIDA`                                 | `"America/Merida"`                 |
| <a id="america_metlakatla"></a> `AMERICA_METLAKATLA`                         | `"America/Metlakatla"`             |
| <a id="america_mexico_city"></a> `AMERICA_MEXICO_CITY`                       | `"America/Mexico_City"`            |
| <a id="america_miquelon"></a> `AMERICA_MIQUELON`                             | `"America/Miquelon"`               |
| <a id="america_moncton"></a> `AMERICA_MONCTON`                               | `"America/Moncton"`                |
| <a id="america_monterrey"></a> `AMERICA_MONTERREY`                           | `"America/Monterrey"`              |
| <a id="america_montevideo"></a> `AMERICA_MONTEVIDEO`                         | `"America/Montevideo"`             |
| <a id="america_montserrat"></a> `AMERICA_MONTSERRAT`                         | `"America/Montserrat"`             |
| <a id="america_nassau"></a> `AMERICA_NASSAU`                                 | `"America/Nassau"`                 |
| <a id="america_new_york"></a> `AMERICA_NEW_YORK`                             | `"America/New_York"`               |
| <a id="america_nipigon"></a> `AMERICA_NIPIGON`                               | `"America/Nipigon"`                |
| <a id="america_nome"></a> `AMERICA_NOME`                                     | `"America/Nome"`                   |
| <a id="america_noronha"></a> `AMERICA_NORONHA`                               | `"America/Noronha"`                |
| <a id="america_north_dakota_beulah"></a> `AMERICA_NORTH_DAKOTA_BEULAH`       | `"America/North_Dakota/Beulah"`    |
| <a id="america_north_dakota_center"></a> `AMERICA_NORTH_DAKOTA_CENTER`       | `"America/North_Dakota/Center"`    |
| <a id="america_north_dakota_new_salem"></a> `AMERICA_NORTH_DAKOTA_NEW_SALEM` | `"America/North_Dakota/New_Salem"` |
| <a id="america_nuuk"></a> `AMERICA_NUUK`                                     | `"America/Nuuk"`                   |
| <a id="america_ojinaga"></a> `AMERICA_OJINAGA`                               | `"America/Ojinaga"`                |
| <a id="america_panama"></a> `AMERICA_PANAMA`                                 | `"America/Panama"`                 |
| <a id="america_pangnirtung"></a> `AMERICA_PANGNIRTUNG`                       | `"America/Pangnirtung"`            |
| <a id="america_paramaribo"></a> `AMERICA_PARAMARIBO`                         | `"America/Paramaribo"`             |
| <a id="america_phoenix"></a> `AMERICA_PHOENIX`                               | `"America/Phoenix"`                |
| <a id="america_port_au_prince"></a> `AMERICA_PORT_AU_PRINCE`                 | `"America/Port-au-Prince"`         |
| <a id="america_port_of_spain"></a> `AMERICA_PORT_OF_SPAIN`                   | `"America/Port_of_Spain"`          |
| <a id="america_porto_velho"></a> `AMERICA_PORTO_VELHO`                       | `"America/Porto_Velho"`            |
| <a id="america_puerto_rico"></a> `AMERICA_PUERTO_RICO`                       | `"America/Puerto_Rico"`            |
| <a id="america_punta_arenas"></a> `AMERICA_PUNTA_ARENAS`                     | `"America/Punta_Arenas"`           |
| <a id="america_rainy_river"></a> `AMERICA_RAINY_RIVER`                       | `"America/Rainy_River"`            |
| <a id="america_rankin_inlet"></a> `AMERICA_RANKIN_INLET`                     | `"America/Rankin_Inlet"`           |
| <a id="america_recife"></a> `AMERICA_RECIFE`                                 | `"America/Recife"`                 |
| <a id="america_regina"></a> `AMERICA_REGINA`                                 | `"America/Regina"`                 |
| <a id="america_resolute"></a> `AMERICA_RESOLUTE`                             | `"America/Resolute"`               |
| <a id="america_rio_branco"></a> `AMERICA_RIO_BRANCO`                         | `"America/Rio_Branco"`             |
| <a id="america_santarem"></a> `AMERICA_SANTAREM`                             | `"America/Santarem"`               |
| <a id="america_santiago"></a> `AMERICA_SANTIAGO`                             | `"America/Santiago"`               |
| <a id="america_santo_domingo"></a> `AMERICA_SANTO_DOMINGO`                   | `"America/Santo_Domingo"`          |
| <a id="america_sao_paulo"></a> `AMERICA_SAO_PAULO`                           | `"America/Sao_Paulo"`              |
| <a id="america_scoresbysund"></a> `AMERICA_SCORESBYSUND`                     | `"America/Scoresbysund"`           |
| <a id="america_sitka"></a> `AMERICA_SITKA`                                   | `"America/Sitka"`                  |
| <a id="america_st_barthelemy"></a> `AMERICA_ST_BARTHELEMY`                   | `"America/St_Barthelemy"`          |
| <a id="america_st_johns"></a> `AMERICA_ST_JOHNS`                             | `"America/St_Johns"`               |
| <a id="america_st_kitts"></a> `AMERICA_ST_KITTS`                             | `"America/St_Kitts"`               |
| <a id="america_st_lucia"></a> `AMERICA_ST_LUCIA`                             | `"America/St_Lucia"`               |
| <a id="america_st_thomas"></a> `AMERICA_ST_THOMAS`                           | `"America/St_Thomas"`              |
| <a id="america_st_vincent"></a> `AMERICA_ST_VINCENT`                         | `"America/St_Vincent"`             |
| <a id="america_swift_current"></a> `AMERICA_SWIFT_CURRENT`                   | `"America/Swift_Current"`          |
| <a id="america_tegucigalpa"></a> `AMERICA_TEGUCIGALPA`                       | `"America/Tegucigalpa"`            |
| <a id="america_thule"></a> `AMERICA_THULE`                                   | `"America/Thule"`                  |
| <a id="america_thunder_bay"></a> `AMERICA_THUNDER_BAY`                       | `"America/Thunder_Bay"`            |
| <a id="america_tijuana"></a> `AMERICA_TIJUANA`                               | `"America/Tijuana"`                |
| <a id="america_toronto"></a> `AMERICA_TORONTO`                               | `"America/Toronto"`                |
| <a id="america_tortola"></a> `AMERICA_TORTOLA`                               | `"America/Tortola"`                |
| <a id="america_vancouver"></a> `AMERICA_VANCOUVER`                           | `"America/Vancouver"`              |
| <a id="america_whitehorse"></a> `AMERICA_WHITEHORSE`                         | `"America/Whitehorse"`             |
| <a id="america_winnipeg"></a> `AMERICA_WINNIPEG`                             | `"America/Winnipeg"`               |
| <a id="america_yakutat"></a> `AMERICA_YAKUTAT`                               | `"America/Yakutat"`                |
| <a id="america_yellowknife"></a> `AMERICA_YELLOWKNIFE`                       | `"America/Yellowknife"`            |
| <a id="antarctica_casey"></a> `ANTARCTICA_CASEY`                             | `"Antarctica/Casey"`               |
| <a id="antarctica_davis"></a> `ANTARCTICA_DAVIS`                             | `"Antarctica/Davis"`               |
| <a id="antarctica_dumontdurville"></a> `ANTARCTICA_DUMONTDURVILLE`           | `"Antarctica/DumontDUrville"`      |
| <a id="antarctica_macquarie"></a> `ANTARCTICA_MACQUARIE`                     | `"Antarctica/Macquarie"`           |
| <a id="antarctica_mawson"></a> `ANTARCTICA_MAWSON`                           | `"Antarctica/Mawson"`              |
| <a id="antarctica_mcmurdo"></a> `ANTARCTICA_MCMURDO`                         | `"Antarctica/McMurdo"`             |
| <a id="antarctica_palmer"></a> `ANTARCTICA_PALMER`                           | `"Antarctica/Palmer"`              |
| <a id="antarctica_rothera"></a> `ANTARCTICA_ROTHERA`                         | `"Antarctica/Rothera"`             |
| <a id="antarctica_syowa"></a> `ANTARCTICA_SYOWA`                             | `"Antarctica/Syowa"`               |
| <a id="antarctica_troll"></a> `ANTARCTICA_TROLL`                             | `"Antarctica/Troll"`               |
| <a id="antarctica_vostok"></a> `ANTARCTICA_VOSTOK`                           | `"Antarctica/Vostok"`              |
| <a id="arctic_longyearbyen"></a> `ARCTIC_LONGYEARBYEN`                       | `"Arctic/Longyearbyen"`            |
| <a id="asia_aden"></a> `ASIA_ADEN`                                           | `"Asia/Aden"`                      |
| <a id="asia_almaty"></a> `ASIA_ALMATY`                                       | `"Asia/Almaty"`                    |
| <a id="asia_amman"></a> `ASIA_AMMAN`                                         | `"Asia/Amman"`                     |
| <a id="asia_anadyr"></a> `ASIA_ANADYR`                                       | `"Asia/Anadyr"`                    |
| <a id="asia_aqtau"></a> `ASIA_AQTAU`                                         | `"Asia/Aqtau"`                     |
| <a id="asia_aqtobe"></a> `ASIA_AQTOBE`                                       | `"Asia/Aqtobe"`                    |
| <a id="asia_ashgabat"></a> `ASIA_ASHGABAT`                                   | `"Asia/Ashgabat"`                  |
| <a id="asia_atyrau"></a> `ASIA_ATYRAU`                                       | `"Asia/Atyrau"`                    |
| <a id="asia_baghdad"></a> `ASIA_BAGHDAD`                                     | `"Asia/Baghdad"`                   |
| <a id="asia_bahrain"></a> `ASIA_BAHRAIN`                                     | `"Asia/Bahrain"`                   |
| <a id="asia_baku"></a> `ASIA_BAKU`                                           | `"Asia/Baku"`                      |
| <a id="asia_bangkok"></a> `ASIA_BANGKOK`                                     | `"Asia/Bangkok"`                   |
| <a id="asia_barnaul"></a> `ASIA_BARNAUL`                                     | `"Asia/Barnaul"`                   |
| <a id="asia_beirut"></a> `ASIA_BEIRUT`                                       | `"Asia/Beirut"`                    |
| <a id="asia_bishkek"></a> `ASIA_BISHKEK`                                     | `"Asia/Bishkek"`                   |
| <a id="asia_brunei"></a> `ASIA_BRUNEI`                                       | `"Asia/Brunei"`                    |
| <a id="asia_chita"></a> `ASIA_CHITA`                                         | `"Asia/Chita"`                     |
| <a id="asia_choibalsan"></a> `ASIA_CHOIBALSAN`                               | `"Asia/Choibalsan"`                |
| <a id="asia_colombo"></a> `ASIA_COLOMBO`                                     | `"Asia/Colombo"`                   |
| <a id="asia_damascus"></a> `ASIA_DAMASCUS`                                   | `"Asia/Damascus"`                  |
| <a id="asia_dhaka"></a> `ASIA_DHAKA`                                         | `"Asia/Dhaka"`                     |
| <a id="asia_dili"></a> `ASIA_DILI`                                           | `"Asia/Dili"`                      |
| <a id="asia_dubai"></a> `ASIA_DUBAI`                                         | `"Asia/Dubai"`                     |
| <a id="asia_dushanbe"></a> `ASIA_DUSHANBE`                                   | `"Asia/Dushanbe"`                  |
| <a id="asia_famagusta"></a> `ASIA_FAMAGUSTA`                                 | `"Asia/Famagusta"`                 |
| <a id="asia_gaza"></a> `ASIA_GAZA`                                           | `"Asia/Gaza"`                      |
| <a id="asia_hebron"></a> `ASIA_HEBRON`                                       | `"Asia/Hebron"`                    |
| <a id="asia_ho_chi_minh"></a> `ASIA_HO_CHI_MINH`                             | `"Asia/Ho_Chi_Minh"`               |
| <a id="asia_hong_kong"></a> `ASIA_HONG_KONG`                                 | `"Asia/Hong_Kong"`                 |
| <a id="asia_hovd"></a> `ASIA_HOVD`                                           | `"Asia/Hovd"`                      |
| <a id="asia_irkutsk"></a> `ASIA_IRKUTSK`                                     | `"Asia/Irkutsk"`                   |
| <a id="asia_istanbul"></a> `ASIA_ISTANBUL`                                   | `"Asia/Istanbul"`                  |
| <a id="asia_jakarta"></a> `ASIA_JAKARTA`                                     | `"Asia/Jakarta"`                   |
| <a id="asia_jayapura"></a> `ASIA_JAYAPURA`                                   | `"Asia/Jayapura"`                  |
| <a id="asia_jerusalem"></a> `ASIA_JERUSALEM`                                 | `"Asia/Jerusalem"`                 |
| <a id="asia_kabul"></a> `ASIA_KABUL`                                         | `"Asia/Kabul"`                     |
| <a id="asia_kamchatka"></a> `ASIA_KAMCHATKA`                                 | `"Asia/Kamchatka"`                 |
| <a id="asia_karachi"></a> `ASIA_KARACHI`                                     | `"Asia/Karachi"`                   |
| <a id="asia_kathmandu"></a> `ASIA_KATHMANDU`                                 | `"Asia/Kathmandu"`                 |
| <a id="asia_khandyga"></a> `ASIA_KHANDYGA`                                   | `"Asia/Khandyga"`                  |
| <a id="asia_kolkata"></a> `ASIA_KOLKATA`                                     | `"Asia/Kolkata"`                   |
| <a id="asia_krasnoyarsk"></a> `ASIA_KRASNOYARSK`                             | `"Asia/Krasnoyarsk"`               |
| <a id="asia_kuala_lumpur"></a> `ASIA_KUALA_LUMPUR`                           | `"Asia/Kuala_Lumpur"`              |
| <a id="asia_kuching"></a> `ASIA_KUCHING`                                     | `"Asia/Kuching"`                   |
| <a id="asia_kuwait"></a> `ASIA_KUWAIT`                                       | `"Asia/Kuwait"`                    |
| <a id="asia_macau"></a> `ASIA_MACAU`                                         | `"Asia/Macau"`                     |
| <a id="asia_magadan"></a> `ASIA_MAGADAN`                                     | `"Asia/Magadan"`                   |
| <a id="asia_makassar"></a> `ASIA_MAKASSAR`                                   | `"Asia/Makassar"`                  |
| <a id="asia_manila"></a> `ASIA_MANILA`                                       | `"Asia/Manila"`                    |
| <a id="asia_muscat"></a> `ASIA_MUSCAT`                                       | `"Asia/Muscat"`                    |
| <a id="asia_nicosia"></a> `ASIA_NICOSIA`                                     | `"Asia/Nicosia"`                   |
| <a id="asia_novokuznetsk"></a> `ASIA_NOVOKUZNETSK`                           | `"Asia/Novokuznetsk"`              |
| <a id="asia_novosibirsk"></a> `ASIA_NOVOSIBIRSK`                             | `"Asia/Novosibirsk"`               |
| <a id="asia_omsk"></a> `ASIA_OMSK`                                           | `"Asia/Omsk"`                      |
| <a id="asia_oral"></a> `ASIA_ORAL`                                           | `"Asia/Oral"`                      |
| <a id="asia_phnom_penh"></a> `ASIA_PHNOM_PENH`                               | `"Asia/Phnom_Penh"`                |
| <a id="asia_pontianak"></a> `ASIA_PONTIANAK`                                 | `"Asia/Pontianak"`                 |
| <a id="asia_pyongyang"></a> `ASIA_PYONGYANG`                                 | `"Asia/Pyongyang"`                 |
| <a id="asia_qatar"></a> `ASIA_QATAR`                                         | `"Asia/Qatar"`                     |
| <a id="asia_qostanay"></a> `ASIA_QOSTANAY`                                   | `"Asia/Qostanay"`                  |
| <a id="asia_qyzylorda"></a> `ASIA_QYZYLORDA`                                 | `"Asia/Qyzylorda"`                 |
| <a id="asia_rangoon"></a> `ASIA_RANGOON`                                     | `"Asia/Rangoon"`                   |
| <a id="asia_riyadh"></a> `ASIA_RIYADH`                                       | `"Asia/Riyadh"`                    |
| <a id="asia_sakhalin"></a> `ASIA_SAKHALIN`                                   | `"Asia/Sakhalin"`                  |
| <a id="asia_samarkand"></a> `ASIA_SAMARKAND`                                 | `"Asia/Samarkand"`                 |
| <a id="asia_seoul"></a> `ASIA_SEOUL`                                         | `"Asia/Seoul"`                     |
| <a id="asia_shanghai"></a> `ASIA_SHANGHAI`                                   | `"Asia/Shanghai"`                  |
| <a id="asia_singapore"></a> `ASIA_SINGAPORE`                                 | `"Asia/Singapore"`                 |
| <a id="asia_srednekolymsk"></a> `ASIA_SREDNEKOLYMSK`                         | `"Asia/Srednekolymsk"`             |
| <a id="asia_taipei"></a> `ASIA_TAIPEI`                                       | `"Asia/Taipei"`                    |
| <a id="asia_tashkent"></a> `ASIA_TASHKENT`                                   | `"Asia/Tashkent"`                  |
| <a id="asia_tbilisi"></a> `ASIA_TBILISI`                                     | `"Asia/Tbilisi"`                   |
| <a id="asia_tehran"></a> `ASIA_TEHRAN`                                       | `"Asia/Tehran"`                    |
| <a id="asia_thimphu"></a> `ASIA_THIMPHU`                                     | `"Asia/Thimphu"`                   |
| <a id="asia_tokyo"></a> `ASIA_TOKYO`                                         | `"Asia/Tokyo"`                     |
| <a id="asia_tomsk"></a> `ASIA_TOMSK`                                         | `"Asia/Tomsk"`                     |
| <a id="asia_ulaanbaatar"></a> `ASIA_ULAANBAATAR`                             | `"Asia/Ulaanbaatar"`               |
| <a id="asia_urumqi"></a> `ASIA_URUMQI`                                       | `"Asia/Urumqi"`                    |
| <a id="asia_ust_nera"></a> `ASIA_UST_NERA`                                   | `"Asia/Ust-Nera"`                  |
| <a id="asia_vientiane"></a> `ASIA_VIENTIANE`                                 | `"Asia/Vientiane"`                 |
| <a id="asia_vladivostok"></a> `ASIA_VLADIVOSTOK`                             | `"Asia/Vladivostok"`               |
| <a id="asia_yakutsk"></a> `ASIA_YAKUTSK`                                     | `"Asia/Yakutsk"`                   |
| <a id="asia_yangon"></a> `ASIA_YANGON`                                       | `"Asia/Yangon"`                    |
| <a id="asia_yekaterinburg"></a> `ASIA_YEKATERINBURG`                         | `"Asia/Yekaterinburg"`             |
| <a id="asia_yerevan"></a> `ASIA_YEREVAN`                                     | `"Asia/Yerevan"`                   |
| <a id="atlantic_azores"></a> `ATLANTIC_AZORES`                               | `"Atlantic/Azores"`                |
| <a id="atlantic_bermuda"></a> `ATLANTIC_BERMUDA`                             | `"Atlantic/Bermuda"`               |
| <a id="atlantic_canary"></a> `ATLANTIC_CANARY`                               | `"Atlantic/Canary"`                |
| <a id="atlantic_cape_verde"></a> `ATLANTIC_CAPE_VERDE`                       | `"Atlantic/Cape_Verde"`            |
| <a id="atlantic_faroe"></a> `ATLANTIC_FAROE`                                 | `"Atlantic/Faroe"`                 |
| <a id="atlantic_madeira"></a> `ATLANTIC_MADEIRA`                             | `"Atlantic/Madeira"`               |
| <a id="atlantic_reykjavik"></a> `ATLANTIC_REYKJAVIK`                         | `"Atlantic/Reykjavik"`             |
| <a id="atlantic_south_georgia"></a> `ATLANTIC_SOUTH_GEORGIA`                 | `"Atlantic/South_Georgia"`         |
| <a id="atlantic_st_helena"></a> `ATLANTIC_ST_HELENA`                         | `"Atlantic/St_Helena"`             |
| <a id="atlantic_stanley"></a> `ATLANTIC_STANLEY`                             | `"Atlantic/Stanley"`               |
| <a id="australia_adelaide"></a> `AUSTRALIA_ADELAIDE`                         | `"Australia/Adelaide"`             |
| <a id="australia_brisbane"></a> `AUSTRALIA_BRISBANE`                         | `"Australia/Brisbane"`             |
| <a id="australia_broken_hill"></a> `AUSTRALIA_BROKEN_HILL`                   | `"Australia/Broken_Hill"`          |
| <a id="australia_currie"></a> `AUSTRALIA_CURRIE`                             | `"Australia/Currie"`               |
| <a id="australia_darwin"></a> `AUSTRALIA_DARWIN`                             | `"Australia/Darwin"`               |
| <a id="australia_eucla"></a> `AUSTRALIA_EUCLA`                               | `"Australia/Eucla"`                |
| <a id="australia_hobart"></a> `AUSTRALIA_HOBART`                             | `"Australia/Hobart"`               |
| <a id="australia_lindeman"></a> `AUSTRALIA_LINDEMAN`                         | `"Australia/Lindeman"`             |
| <a id="australia_lord_howe"></a> `AUSTRALIA_LORD_HOWE`                       | `"Australia/Lord_Howe"`            |
| <a id="australia_melbourne"></a> `AUSTRALIA_MELBOURNE`                       | `"Australia/Melbourne"`            |
| <a id="australia_perth"></a> `AUSTRALIA_PERTH`                               | `"Australia/Perth"`                |
| <a id="australia_sydney"></a> `AUSTRALIA_SYDNEY`                             | `"Australia/Sydney"`               |
| <a id="client"></a> `CLIENT`                                                 | `"client"`                         |
| <a id="europe_amsterdam"></a> `EUROPE_AMSTERDAM`                             | `"Europe/Amsterdam"`               |
| <a id="europe_andorra"></a> `EUROPE_ANDORRA`                                 | `"Europe/Andorra"`                 |
| <a id="europe_astrakhan"></a> `EUROPE_ASTRAKHAN`                             | `"Europe/Astrakhan"`               |
| <a id="europe_athens"></a> `EUROPE_ATHENS`                                   | `"Europe/Athens"`                  |
| <a id="europe_belgrade"></a> `EUROPE_BELGRADE`                               | `"Europe/Belgrade"`                |
| <a id="europe_berlin"></a> `EUROPE_BERLIN`                                   | `"Europe/Berlin"`                  |
| <a id="europe_bratislava"></a> `EUROPE_BRATISLAVA`                           | `"Europe/Bratislava"`              |
| <a id="europe_brussels"></a> `EUROPE_BRUSSELS`                               | `"Europe/Brussels"`                |
| <a id="europe_bucharest"></a> `EUROPE_BUCHAREST`                             | `"Europe/Bucharest"`               |
| <a id="europe_budapest"></a> `EUROPE_BUDAPEST`                               | `"Europe/Budapest"`                |
| <a id="europe_busingen"></a> `EUROPE_BUSINGEN`                               | `"Europe/Busingen"`                |
| <a id="europe_chisinau"></a> `EUROPE_CHISINAU`                               | `"Europe/Chisinau"`                |
| <a id="europe_copenhagen"></a> `EUROPE_COPENHAGEN`                           | `"Europe/Copenhagen"`              |
| <a id="europe_dublin"></a> `EUROPE_DUBLIN`                                   | `"Europe/Dublin"`                  |
| <a id="europe_gibraltar"></a> `EUROPE_GIBRALTAR`                             | `"Europe/Gibraltar"`               |
| <a id="europe_guernsey"></a> `EUROPE_GUERNSEY`                               | `"Europe/Guernsey"`                |
| <a id="europe_helsinki"></a> `EUROPE_HELSINKI`                               | `"Europe/Helsinki"`                |
| <a id="europe_isle_of_man"></a> `EUROPE_ISLE_OF_MAN`                         | `"Europe/Isle_of_Man"`             |
| <a id="europe_istanbul"></a> `EUROPE_ISTANBUL`                               | `"Europe/Istanbul"`                |
| <a id="europe_jersey"></a> `EUROPE_JERSEY`                                   | `"Europe/Jersey"`                  |
| <a id="europe_kaliningrad"></a> `EUROPE_KALININGRAD`                         | `"Europe/Kaliningrad"`             |
| <a id="europe_kiev"></a> `EUROPE_KIEV`                                       | `"Europe/Kiev"`                    |
| <a id="europe_kirov"></a> `EUROPE_KIROV`                                     | `"Europe/Kirov"`                   |
| <a id="europe_lisbon"></a> `EUROPE_LISBON`                                   | `"Europe/Lisbon"`                  |
| <a id="europe_ljubljana"></a> `EUROPE_LJUBLJANA`                             | `"Europe/Ljubljana"`               |
| <a id="europe_london"></a> `EUROPE_LONDON`                                   | `"Europe/London"`                  |
| <a id="europe_luxembourg"></a> `EUROPE_LUXEMBOURG`                           | `"Europe/Luxembourg"`              |
| <a id="europe_madrid"></a> `EUROPE_MADRID`                                   | `"Europe/Madrid"`                  |
| <a id="europe_malta"></a> `EUROPE_MALTA`                                     | `"Europe/Malta"`                   |
| <a id="europe_mariehamn"></a> `EUROPE_MARIEHAMN`                             | `"Europe/Mariehamn"`               |
| <a id="europe_minsk"></a> `EUROPE_MINSK`                                     | `"Europe/Minsk"`                   |
| <a id="europe_monaco"></a> `EUROPE_MONACO`                                   | `"Europe/Monaco"`                  |
| <a id="europe_moscow"></a> `EUROPE_MOSCOW`                                   | `"Europe/Moscow"`                  |
| <a id="europe_nicosia"></a> `EUROPE_NICOSIA`                                 | `"Europe/Nicosia"`                 |
| <a id="europe_oslo"></a> `EUROPE_OSLO`                                       | `"Europe/Oslo"`                    |
| <a id="europe_paris"></a> `EUROPE_PARIS`                                     | `"Europe/Paris"`                   |
| <a id="europe_podgorica"></a> `EUROPE_PODGORICA`                             | `"Europe/Podgorica"`               |
| <a id="europe_prague"></a> `EUROPE_PRAGUE`                                   | `"Europe/Prague"`                  |
| <a id="europe_riga"></a> `EUROPE_RIGA`                                       | `"Europe/Riga"`                    |
| <a id="europe_rome"></a> `EUROPE_ROME`                                       | `"Europe/Rome"`                    |
| <a id="europe_samara"></a> `EUROPE_SAMARA`                                   | `"Europe/Samara"`                  |
| <a id="europe_san_marino"></a> `EUROPE_SAN_MARINO`                           | `"Europe/San_Marino"`              |
| <a id="europe_sarajevo"></a> `EUROPE_SARAJEVO`                               | `"Europe/Sarajevo"`                |
| <a id="europe_saratov"></a> `EUROPE_SARATOV`                                 | `"Europe/Saratov"`                 |
| <a id="europe_simferopol"></a> `EUROPE_SIMFEROPOL`                           | `"Europe/Simferopol"`              |
| <a id="europe_skopje"></a> `EUROPE_SKOPJE`                                   | `"Europe/Skopje"`                  |
| <a id="europe_sofia"></a> `EUROPE_SOFIA`                                     | `"Europe/Sofia"`                   |
| <a id="europe_stockholm"></a> `EUROPE_STOCKHOLM`                             | `"Europe/Stockholm"`               |
| <a id="europe_tallinn"></a> `EUROPE_TALLINN`                                 | `"Europe/Tallinn"`                 |
| <a id="europe_tirane"></a> `EUROPE_TIRANE`                                   | `"Europe/Tirane"`                  |
| <a id="europe_ulyanovsk"></a> `EUROPE_ULYANOVSK`                             | `"Europe/Ulyanovsk"`               |
| <a id="europe_uzhgorod"></a> `EUROPE_UZHGOROD`                               | `"Europe/Uzhgorod"`                |
| <a id="europe_vaduz"></a> `EUROPE_VADUZ`                                     | `"Europe/Vaduz"`                   |
| <a id="europe_vatican"></a> `EUROPE_VATICAN`                                 | `"Europe/Vatican"`                 |
| <a id="europe_vienna"></a> `EUROPE_VIENNA`                                   | `"Europe/Vienna"`                  |
| <a id="europe_vilnius"></a> `EUROPE_VILNIUS`                                 | `"Europe/Vilnius"`                 |
| <a id="europe_volgograd"></a> `EUROPE_VOLGOGRAD`                             | `"Europe/Volgograd"`               |
| <a id="europe_warsaw"></a> `EUROPE_WARSAW`                                   | `"Europe/Warsaw"`                  |
| <a id="europe_zagreb"></a> `EUROPE_ZAGREB`                                   | `"Europe/Zagreb"`                  |
| <a id="europe_zaporozhye"></a> `EUROPE_ZAPOROZHYE`                           | `"Europe/Zaporozhye"`              |
| <a id="europe_zurich"></a> `EUROPE_ZURICH`                                   | `"Europe/Zurich"`                  |
| <a id="indian_antananarivo"></a> `INDIAN_ANTANANARIVO`                       | `"Indian/Antananarivo"`            |
| <a id="indian_chagos"></a> `INDIAN_CHAGOS`                                   | `"Indian/Chagos"`                  |
| <a id="indian_christmas"></a> `INDIAN_CHRISTMAS`                             | `"Indian/Christmas"`               |
| <a id="indian_cocos"></a> `INDIAN_COCOS`                                     | `"Indian/Cocos"`                   |
| <a id="indian_comoro"></a> `INDIAN_COMORO`                                   | `"Indian/Comoro"`                  |
| <a id="indian_kerguelen"></a> `INDIAN_KERGUELEN`                             | `"Indian/Kerguelen"`               |
| <a id="indian_mahe"></a> `INDIAN_MAHE`                                       | `"Indian/Mahe"`                    |
| <a id="indian_maldives"></a> `INDIAN_MALDIVES`                               | `"Indian/Maldives"`                |
| <a id="indian_mauritius"></a> `INDIAN_MAURITIUS`                             | `"Indian/Mauritius"`               |
| <a id="indian_mayotte"></a> `INDIAN_MAYOTTE`                                 | `"Indian/Mayotte"`                 |
| <a id="indian_reunion"></a> `INDIAN_REUNION`                                 | `"Indian/Reunion"`                 |
| <a id="pacific_apia"></a> `PACIFIC_APIA`                                     | `"Pacific/Apia"`                   |
| <a id="pacific_auckland"></a> `PACIFIC_AUCKLAND`                             | `"Pacific/Auckland"`               |
| <a id="pacific_bougainville"></a> `PACIFIC_BOUGAINVILLE`                     | `"Pacific/Bougainville"`           |
| <a id="pacific_chatham"></a> `PACIFIC_CHATHAM`                               | `"Pacific/Chatham"`                |
| <a id="pacific_chuuk"></a> `PACIFIC_CHUUK`                                   | `"Pacific/Chuuk"`                  |
| <a id="pacific_easter"></a> `PACIFIC_EASTER`                                 | `"Pacific/Easter"`                 |
| <a id="pacific_efate"></a> `PACIFIC_EFATE`                                   | `"Pacific/Efate"`                  |
| <a id="pacific_enderbury"></a> `PACIFIC_ENDERBURY`                           | `"Pacific/Enderbury"`              |
| <a id="pacific_fakaofo"></a> `PACIFIC_FAKAOFO`                               | `"Pacific/Fakaofo"`                |
| <a id="pacific_fiji"></a> `PACIFIC_FIJI`                                     | `"Pacific/Fiji"`                   |
| <a id="pacific_funafuti"></a> `PACIFIC_FUNAFUTI`                             | `"Pacific/Funafuti"`               |
| <a id="pacific_galapagos"></a> `PACIFIC_GALAPAGOS`                           | `"Pacific/Galapagos"`              |
| <a id="pacific_gambier"></a> `PACIFIC_GAMBIER`                               | `"Pacific/Gambier"`                |
| <a id="pacific_guadalcanal"></a> `PACIFIC_GUADALCANAL`                       | `"Pacific/Guadalcanal"`            |
| <a id="pacific_guam"></a> `PACIFIC_GUAM`                                     | `"Pacific/Guam"`                   |
| <a id="pacific_honolulu"></a> `PACIFIC_HONOLULU`                             | `"Pacific/Honolulu"`               |
| <a id="pacific_kanton"></a> `PACIFIC_KANTON`                                 | `"Pacific/Kanton"`                 |
| <a id="pacific_kiritimati"></a> `PACIFIC_KIRITIMATI`                         | `"Pacific/Kiritimati"`             |
| <a id="pacific_kosrae"></a> `PACIFIC_KOSRAE`                                 | `"Pacific/Kosrae"`                 |
| <a id="pacific_kwajalein"></a> `PACIFIC_KWAJALEIN`                           | `"Pacific/Kwajalein"`              |
| <a id="pacific_majuro"></a> `PACIFIC_MAJURO`                                 | `"Pacific/Majuro"`                 |
| <a id="pacific_marquesas"></a> `PACIFIC_MARQUESAS`                           | `"Pacific/Marquesas"`              |
| <a id="pacific_midway"></a> `PACIFIC_MIDWAY`                                 | `"Pacific/Midway"`                 |
| <a id="pacific_nauru"></a> `PACIFIC_NAURU`                                   | `"Pacific/Nauru"`                  |
| <a id="pacific_niue"></a> `PACIFIC_NIUE`                                     | `"Pacific/Niue"`                   |
| <a id="pacific_norfolk"></a> `PACIFIC_NORFOLK`                               | `"Pacific/Norfolk"`                |
| <a id="pacific_noumea"></a> `PACIFIC_NOUMEA`                                 | `"Pacific/Noumea"`                 |
| <a id="pacific_pago_pago"></a> `PACIFIC_PAGO_PAGO`                           | `"Pacific/Pago_Pago"`              |
| <a id="pacific_palau"></a> `PACIFIC_PALAU`                                   | `"Pacific/Palau"`                  |
| <a id="pacific_pitcairn"></a> `PACIFIC_PITCAIRN`                             | `"Pacific/Pitcairn"`               |
| <a id="pacific_pohnpei"></a> `PACIFIC_POHNPEI`                               | `"Pacific/Pohnpei"`                |
| <a id="pacific_port_moresby"></a> `PACIFIC_PORT_MORESBY`                     | `"Pacific/Port_Moresby"`           |
| <a id="pacific_rarotonga"></a> `PACIFIC_RAROTONGA`                           | `"Pacific/Rarotonga"`              |
| <a id="pacific_saipan"></a> `PACIFIC_SAIPAN`                                 | `"Pacific/Saipan"`                 |
| <a id="pacific_tahiti"></a> `PACIFIC_TAHITI`                                 | `"Pacific/Tahiti"`                 |
| <a id="pacific_tarawa"></a> `PACIFIC_TARAWA`                                 | `"Pacific/Tarawa"`                 |
| <a id="pacific_tongatapu"></a> `PACIFIC_TONGATAPU`                           | `"Pacific/Tongatapu"`              |
| <a id="pacific_wake"></a> `PACIFIC_WAKE`                                     | `"Pacific/Wake"`                   |
| <a id="pacific_wallis"></a> `PACIFIC_WALLIS`                                 | `"Pacific/Wallis"`                 |
| <a id="utc"></a> `UTC`                                                       | `"utc"`                            |

***

### UpdateType

Defined in: packages/client-airtable/src/enums.ts:472

When updating records, the type specifies how data are updated.

#### Enumeration Members

| Enumeration Member             | Value     | Description                                                                  |
| ------------------------------ | --------- | ---------------------------------------------------------------------------- |
| <a id="full"></a> `FULL`       | `"PUT"`   | Will update the included fields and clear all unincluded fields.             |
| <a id="partial"></a> `PARTIAL` | `"PATCH"` | Will only update the included fields. Fields not included will be unchanged. |

***

### UserLocale

Defined in: packages/client-airtable/src/enums.ts:483

The user locale that should be used to format dates when using `string` as the [CellFormat](#cellformat).

#### Enumeration Members

| Enumeration Member                                                                       | Value        |
| ---------------------------------------------------------------------------------------- | ------------ |
| <a id="afrikaans"></a> `AFRIKAANS`                                                       | `"af"`       |
| <a id="albanian"></a> `ALBANIAN`                                                         | `"sq"`       |
| <a id="arabic"></a> `ARABIC`                                                             | `"ar"`       |
| <a id="arabic_saudi_arabia"></a> `ARABIC_SAUDI_ARABIA`                                   | `"ar-sa"`    |
| <a id="armenian"></a> `ARMENIAN`                                                         | `"hy-am"`    |
| <a id="australian_english"></a> `AUSTRALIAN_ENGLISH`                                     | `"en-au"`    |
| <a id="austrian_german"></a> `AUSTRIAN_GERMAN`                                           | `"de-at"`    |
| <a id="azerbaijani"></a> `AZERBAIJANI`                                                   | `"az"`       |
| <a id="bahasa_indonesia"></a> `BAHASA_INDONESIA`                                         | `"id"`       |
| <a id="bahasa_malaysia"></a> `BAHASA_MALAYSIA`                                           | `"ms"`       |
| <a id="belarusian"></a> `BELARUSIAN`                                                     | `"be"`       |
| <a id="bengali"></a> `BENGALI`                                                           | `"bn"`       |
| <a id="bosnian"></a> `BOSNIAN`                                                           | `"bs"`       |
| <a id="boso_jowo"></a> `BOSO_JOWO`                                                       | `"jv"`       |
| <a id="brazilian_portuguese"></a> `BRAZILIAN_PORTUGUESE`                                 | `"pt-br"`    |
| <a id="breton"></a> `BRETON`                                                             | `"br"`       |
| <a id="british_english"></a> `BRITISH_ENGLISH`                                           | `"en-gb"`    |
| <a id="bulgarian"></a> `BULGARIAN`                                                       | `"bg"`       |
| <a id="burmese"></a> `BURMESE`                                                           | `"my"`       |
| <a id="canadian_english"></a> `CANADIAN_ENGLISH`                                         | `"en-ca"`    |
| <a id="canadian_french"></a> `CANADIAN_FRENCH`                                           | `"fr-ca"`    |
| <a id="catalan"></a> `CATALAN`                                                           | `"ca"`       |
| <a id="chuvash"></a> `CHUVASH`                                                           | `"cv"`       |
| <a id="czech"></a> `CZECH`                                                               | `"cs"`       |
| <a id="danish"></a> `DANISH`                                                             | `"da"`       |
| <a id="dutch"></a> `DUTCH`                                                               | `"nl"`       |
| <a id="english"></a> `ENGLISH`                                                           | `"en-us"`    |
| <a id="esperanto"></a> `ESPERANTO`                                                       | `"eo"`       |
| <a id="estonian"></a> `ESTONIAN`                                                         | `"et"`       |
| <a id="euskara"></a> `EUSKARA`                                                           | `"eu"`       |
| <a id="faroese"></a> `FAROESE`                                                           | `"fo"`       |
| <a id="finnish"></a> `FINNISH`                                                           | `"fi"`       |
| <a id="french"></a> `FRENCH`                                                             | `"fr"`       |
| <a id="frisian"></a> `FRISIAN`                                                           | `"fy"`       |
| <a id="galician"></a> `GALICIAN`                                                         | `"gl"`       |
| <a id="georgian"></a> `GEORGIAN`                                                         | `"ka"`       |
| <a id="german"></a> `GERMAN`                                                             | `"de"`       |
| <a id="hebrew"></a> `HEBREW`                                                             | `"he"`       |
| <a id="hindi"></a> `HINDI`                                                               | `"hi"`       |
| <a id="hrvatski"></a> `HRVATSKI`                                                         | `"hr"`       |
| <a id="hungarian"></a> `HUNGARIAN`                                                       | `"hu"`       |
| <a id="icelandic"></a> `ICELANDIC`                                                       | `"is"`       |
| <a id="irish_english"></a> `IRISH_ENGLISH`                                               | `"en-ie"`    |
| <a id="italian"></a> `ITALIAN`                                                           | `"it"`       |
| <a id="japanese"></a> `JAPANESE`                                                         | `"ja"`       |
| <a id="khmer"></a> `KHMER`                                                               | `"km"`       |
| <a id="korean"></a> `KOREAN`                                                             | `"ko"`       |
| <a id="latvian"></a> `LATVIAN`                                                           | `"lv"`       |
| <a id="lithuanian"></a> `LITHUANIAN`                                                     | `"lt"`       |
| <a id="luxembourgish"></a> `LUXEMBOURGISH`                                               | `"lb"`       |
| <a id="macedonian"></a> `MACEDONIAN`                                                     | `"mk"`       |
| <a id="malayalam"></a> `MALAYALAM`                                                       | `"ml"`       |
| <a id="marathi"></a> `MARATHI`                                                           | `"mr"`       |
| <a id="modern_greek"></a> `MODERN_GREEK`                                                 | `"el"`       |
| <a id="montenegrin"></a> `MONTENEGRIN`                                                   | `"me"`       |
| <a id="moroccan_arabic"></a> `MOROCCAN_ARABIC`                                           | `"ar-ma"`    |
| <a id="morocco_central_atlas_tamaziɣt"></a> `MOROCCO_CENTRAL_ATLAS_TAMAZIƔT`             | `"tzm"`      |
| <a id="morocco_central_atlas_tamaziyt_latin"></a> `MOROCCO_CENTRAL_ATLAS_TAMAZIYT_LATIN` | `"tzm_latn"` |
| <a id="nepali"></a> `NEPALI`                                                             | `"ne"`       |
| <a id="new_zealand_english"></a> `NEW_ZEALAND_ENGLISH`                                   | `"en-nz"`    |
| <a id="norwegian_bokmal"></a> `NORWEGIAN_BOKMAL`                                         | `"nb"`       |
| <a id="norwegian_nynorsk"></a> `NORWEGIAN_NYNORSK`                                       | `"nn"`       |
| <a id="persian"></a> `PERSIAN`                                                           | `"fa"`       |
| <a id="polish"></a> `POLISH`                                                             | `"pl"`       |
| <a id="portuguese"></a> `PORTUGUESE`                                                     | `"pt"`       |
| <a id="romanian"></a> `ROMANIAN`                                                         | `"ro"`       |
| <a id="russian"></a> `RUSSIAN`                                                           | `"ru"`       |
| <a id="serbian_cyrillic"></a> `SERBIAN_CYRILLIC`                                         | `"sr-cyrl"`  |
| <a id="serbian_latin"></a> `SERBIAN_LATIN`                                               | `"sr"`       |
| <a id="simplified_chinese"></a> `SIMPLIFIED_CHINESE`                                     | `"zh-cn"`    |
| <a id="sinhala"></a> `SINHALA`                                                           | `"si"`       |
| <a id="slovak"></a> `SLOVAK`                                                             | `"sk"`       |
| <a id="slovenian"></a> `SLOVENIAN`                                                       | `"sl"`       |
| <a id="spanish"></a> `SPANISH`                                                           | `"es"`       |
| <a id="swedish"></a> `SWEDISH`                                                           | `"sv"`       |
| <a id="swiss_french"></a> `SWISS_FRENCH`                                                 | `"fr-ch"`    |
| <a id="tagalog_filipino"></a> `TAGALOG_FILIPINO`                                         | `"tl-ph"`    |
| <a id="talossan"></a> `TALOSSAN`                                                         | `"tzl"`      |
| <a id="tamil"></a> `TAMIL`                                                               | `"ta"`       |
| <a id="thai"></a> `THAI`                                                                 | `"th"`       |
| <a id="tibetan"></a> `TIBETAN`                                                           | `"bo"`       |
| <a id="traditional_chinese"></a> `TRADITIONAL_CHINESE`                                   | `"zh-tw"`    |
| <a id="tunisian_arabic"></a> `TUNISIAN_ARABIC`                                           | `"ar-tn"`    |
| <a id="turkish"></a> `TURKISH`                                                           | `"tr"`       |
| <a id="ukrainian"></a> `UKRAINIAN`                                                       | `"uk"`       |
| <a id="uzbek"></a> `UZBEK`                                                               | `"uz"`       |
| <a id="vietnamese"></a> `VIETNAMESE`                                                     | `"vi"`       |
| <a id="welsh"></a> `WELSH`                                                               | `"cy"`       |

## Classes

### AirtableClient

Defined in: packages/client-airtable/src/client.ts:31

Client for interacting with Airtable.

This client will handle and throttle requests to ensure that users will not overstep the rate limits set by Airtable.

#### Constructors

##### Constructor

> **new AirtableClient**(`apiToken`, `requestOptions`): [`AirtableClient`](#airtableclient)

Defined in: packages/client-airtable/src/client.ts:53

Create a new instance.

###### Parameters

| Parameter                             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Description                                                                                                                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiToken`                            | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Token to use to interact with Airtable.                                                                                                                                                              |
| `requestOptions`                      | { `agent?`: `unknown`; `baseURL?`: `string`; `body?`: `BodyInit` \| `Record`<`string`, `any`> \| `null`; `cache?`: `RequestCache`; `credentials?`: `RequestCredentials`; `dispatcher?`: `any`; `duplex?`: `"half"`; `headers?`: `HeadersInit`; `ignoreResponseError?`: `boolean`; `integrity?`: `string`; `keepalive?`: `boolean`; `method?`: `string`; `mode?`: `RequestMode`; `onRequest?`: `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`>>>; `onRequestError?`: `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`> & { `error`: `Error`; }>>; `onResponse?`: `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`> & { `response`: `FetchResponse`<`any`>; }>>; `onResponseError?`: `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`> & { `response`: `FetchResponse`<`any`>; }>>; `params?`: `Record`<`string`, `any`>; `parseResponse?`: (`responseText`) => `any`; `priority?`: `RequestPriority`; `query?`: `Record`<`string`, `any`>; `redirect?`: `RequestRedirect`; `referrer?`: `string`; `referrerPolicy?`: `ReferrerPolicy`; `responseType?`: `ResponseType`; `retry?`: `number` \| `false`; `retryDelay?`: `number` \| (`context`) => `number`; `retryStatusCodes?`: `number`\[]; `signal?`: `AbortSignal` \| `null`; `timeout?`: `number`; `window?`: `null`; } | Allows user to override configurations of the underlying `fetch` function.                                                                                                                           |
| `requestOptions.agent?`               | `unknown`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Only supported older Node.js versions using node-fetch-native polyfill.                                                                                                                              |
| `requestOptions.baseURL?`             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                                                                                                                    |
| `requestOptions.body?`                | `BodyInit` \| `Record`<`string`, `any`> \| `null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | -                                                                                                                                                                                                    |
| `requestOptions.cache?`               | `RequestCache`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | A string indicating how the request will interact with the browser's cache to set request's cache.                                                                                                   |
| `requestOptions.credentials?`         | `RequestCredentials`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.                                             |
| `requestOptions.dispatcher?`          | `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Only supported in Node.js >= 18 using undici **See** <https://undici.nodejs.org/#/docs/api/Dispatcher>                                                                                               |
| `requestOptions.duplex?`              | `"half"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **`Experimental`** Set to "half" to enable duplex streaming. Will be automatically set to "half" when using a ReadableStream as body. **See** <https://fetch.spec.whatwg.org/#enumdef-requestduplex> |
| `requestOptions.headers?`             | `HeadersInit`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | A Headers object, an object literal, or an array of two-item arrays to set request's headers.                                                                                                        |
| `requestOptions.ignoreResponseError?` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | -                                                                                                                                                                                                    |
| `requestOptions.integrity?`           | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | A cryptographic hash of the resource to be fetched by request. Sets request's integrity.                                                                                                             |
| `requestOptions.keepalive?`           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | A boolean to set request's keepalive.                                                                                                                                                                |
| `requestOptions.method?`              | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | A string to set request's method.                                                                                                                                                                    |
| `requestOptions.mode?`                | `RequestMode`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.                                                                              |
| `requestOptions.onRequest?`           | `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`>>>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | -                                                                                                                                                                                                    |
| `requestOptions.onRequestError?`      | `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`> & { `error`: `Error`; }>>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -                                                                                                                                                                                                    |
| `requestOptions.onResponse?`          | `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`> & { `response`: `FetchResponse`<`any`>; }>>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | -                                                                                                                                                                                                    |
| `requestOptions.onResponseError?`     | `MaybeArray`<`FetchHook`<`FetchContext`<`any`, `ResponseType`> & { `response`: `FetchResponse`<`any`>; }>>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | -                                                                                                                                                                                                    |
| `requestOptions.params?`              | `Record`<`string`, `any`>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Deprecated** use query instead.                                                                                                                                                                    |
| `requestOptions.parseResponse?`       | (`responseText`) => `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | -                                                                                                                                                                                                    |
| `requestOptions.priority?`            | `RequestPriority`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | -                                                                                                                                                                                                    |
| `requestOptions.query?`               | `Record`<`string`, `any`>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | -                                                                                                                                                                                                    |
| `requestOptions.redirect?`            | `RequestRedirect`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.                    |
| `requestOptions.referrer?`            | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.                                                                                           |
| `requestOptions.referrerPolicy?`      | `ReferrerPolicy`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | A referrer policy to set request's referrerPolicy.                                                                                                                                                   |
| `requestOptions.responseType?`        | `ResponseType`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | -                                                                                                                                                                                                    |
| `requestOptions.retry?`               | `number` \| `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -                                                                                                                                                                                                    |
| `requestOptions.retryDelay?`          | `number` \| (`context`) => `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Delay between retries in milliseconds.                                                                                                                                                               |
| `requestOptions.retryStatusCodes?`    | `number`\[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default is \[408, 409, 425, 429, 500, 502, 503, 504]                                                                                                                                                 |
| `requestOptions.signal?`              | `AbortSignal` \| `null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | An AbortSignal to set request's signal.                                                                                                                                                              |
| `requestOptions.timeout?`             | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | timeout in milliseconds                                                                                                                                                                              |
| `requestOptions.window?`              | `null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Can only be null. Used to disassociate request from any Window.                                                                                                                                      |

###### Returns

[`AirtableClient`](#airtableclient)

#### Methods

##### createRecords()

> **createRecords**<`RequestFields`, `ResponseFields`>(`request`): `Promise`<{ `records`: { `createdTime`: `Date`; `fields`: `ResponseFields`; `id`: `string`; }\[]; }>

Defined in: packages/client-airtable/src/client.ts:84

Create new records.

###### Type Parameters

| Type Parameter                                           | Default type    | Description                                                                        |
| -------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------- |
| `RequestFields` *extends* `Record`<`string`, `unknown`>  | -               | The fields to set when creating the records.                                       |
| `ResponseFields` *extends* `Record`<`string`, `unknown`> | `RequestFields` | The fields returned after creation, usually should just match the `RequestFields`. |

###### Parameters

| Parameter                        | Type                                                                                                                                                                                            | Description                                                                                                                                                                                                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`                        | { `baseId`: `string`; `records`: \[{ `fields`: `RequestFields`; }, `...{ fields: RequestFields }[]`]; `returnFieldsByFieldId?`: `boolean`; `tableIdOrName`: `string`; `typecast?`: `boolean`; } | Refer to [CreateRecordsRequest](#createrecordsrequest).                                                                                                                                                                                                                 |
| `request.baseId`                 | `string`                                                                                                                                                                                        | Identifier for the base.                                                                                                                                                                                                                                                |
| `request.records`                | \[{ `fields`: `RequestFields`; }, `...{ fields: RequestFields }[]`]                                                                                                                             | Records to create. Maximum of 10.                                                                                                                                                                                                                                       |
| `request.returnFieldsByFieldId?` | `boolean`                                                                                                                                                                                       | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                |
| `request.tableIdOrName`          | `string`                                                                                                                                                                                        | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                      |
| `request.typecast?`              | `boolean`                                                                                                                                                                                       | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |

###### Returns

`Promise`<{ `records`: { `createdTime`: `Date`; `fields`: `ResponseFields`; `id`: `string`; }\[]; }>

Refer to [CreateRecordsResponse](#createrecordsresponse).

##### deleteRecords()

> **deleteRecords**(`request`): `Promise`<{ `records`: { `deleted`: `boolean`; `id`: `string`; }\[]; }>

Defined in: packages/client-airtable/src/client.ts:96

Delete records.

###### Parameters

| Parameter               | Type                                                                       | Description                                                                        |
| ----------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `request`               | { `baseId`: `string`; `records`: `string`\[]; `tableIdOrName`: `string`; } | Refer to [DeleteRecordsRequest](#deleterecordsrequest).                            |
| `request.baseId`        | `string`                                                                   | Identifier for the base.                                                           |
| `request.records`       | `string`\[]                                                                | List of record IDs to delete. Maximum of 10.                                       |
| `request.tableIdOrName` | `string`                                                                   | Identifier or name for the table. Preference is to use the ID which is unchanging. |

###### Returns

`Promise`<{ `records`: { `deleted`: `boolean`; `id`: `string`; }\[]; }>

Refer to [DeleteRecordsResponse](#deleterecordsresponse).

##### getRecord()

> **getRecord**<`Fields`>(`request`): `Promise`<[`IndividualRecord`](#individualrecord)<`Fields`>>

Defined in: packages/client-airtable/src/client.ts:108

Get a record.

###### Type Parameters

| Type Parameter                                   |
| ------------------------------------------------ |
| `Fields` *extends* `Record`<`string`, `unknown`> |

###### Parameters

| Parameter                        | Type                                                                                                                                                                                                                                        | Description                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                        | { `baseId`: `string`; `cellFormat?`: [`CellFormat`](#cellformat); `recordId`: `string`; `returnFieldsByFieldId?`: `boolean`; `tableIdOrName`: `string`; `timeZone?`: [`Timezone`](#timezone); `userLocale?`: [`UserLocale`](#userlocale); } | Refer to [GetRecordRequest](#getrecordrequest).                                                                                                                          |
| `request.baseId`                 | `string`                                                                                                                                                                                                                                    | Identifier for the base.                                                                                                                                                 |
| `request.cellFormat?`            | [`CellFormat`](#cellformat)                                                                                                                                                                                                                 | The format that should be used for cell values. Defaults to [CellFormat.JSON](#json).                                                                                    |
| `request.recordId`               | `string`                                                                                                                                                                                                                                    | Identifier for the record.                                                                                                                                               |
| `request.returnFieldsByFieldId?` | `boolean`                                                                                                                                                                                                                                   | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name. |
| `request.tableIdOrName`          | `string`                                                                                                                                                                                                                                    | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                       |
| `request.timeZone?`              | [`Timezone`](#timezone)                                                                                                                                                                                                                     | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.           |
| `request.userLocale?`            | [`UserLocale`](#userlocale)                                                                                                                                                                                                                 | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.         |

###### Returns

`Promise`<[`IndividualRecord`](#individualrecord)<`Fields`>>

Refer to [IndividualRecord](#individualrecord).

##### listRecords()

> **listRecords**<`Fields`>(`request`): `Promise`<{ `offset?`: `string`; `records`: [`IndividualRecord`](#individualrecord)<`Fields`> & { `commentCount?`: `number`; }\[]; }>

Defined in: packages/client-airtable/src/client.ts:120

Search for records based on given criterias.

###### Type Parameters

| Type Parameter                                   |
| ------------------------------------------------ |
| `Fields` *extends* `Record`<`string`, `unknown`> |

###### Parameters

| Parameter                        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `request`                        | { `baseId`: `string`; `cellFormat?`: [`CellFormat`](#cellformat); `fields?`: [`UnionToTuple`](#uniontotuple)<\`${Extract\<keyof Fields, string \| number>}\`>; `filterByFormula?`: `string`; `maxRecords?`: `number`; `offset?`: `string`; `pageSize?`: `number`; `recordMetadata?`: `"commentCount"`\[]; `returnFieldsByFieldId?`: `boolean`; `sort?`: { `direction?`: [`Direction`](#direction); `field`: `string`; }\[]; `tableIdOrName`: `string`; `timeZone?`: [`Timezone`](#timezone); `typecast?`: `boolean`; `userLocale?`: [`UserLocale`](#userlocale); `view?`: `string`; } | Refer to [ListRecordsRequest](#listrecordsrequest).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `request.baseId`                 | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Identifier for the base.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `request.cellFormat?`            | [`CellFormat`](#cellformat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | The format that should be used for cell values. Defaults to [CellFormat.JSON](#json).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `request.fields?`                | [`UnionToTuple`](#uniontotuple)<\`${Extract\<keyof Fields, string \| number>}\`>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Only data for fields whose names or IDs are in this list will be included in the result. If you don't need every field, you can use this parameter to reduce the amount of data transferred. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit.                                                                                                                                                                                                                                                                                        |
| `request.filterByFormula?`       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | A formula used to filter records. The formula will be evaluated for each record, and if the result is not `0`, `false`, \`\`, `NaN`, `[]`, or `#Error!` the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request. If combined with the `view` parameter, only records in that view which satisfy the formula will be returned. Formulas can use field names, or field id's inside of the formula. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. |
| `request.maxRecords?`            | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The maximum total number of records that will be returned in your requests. If this value is larger than `pageSize` (which is 100 by default), you may have to load multiple pages to reach this total.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `request.offset?`                | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | To fetch the next page of records, include offset from the previous request in the next request's parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `request.pageSize?`              | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The number of records returned in each request. Must be less than or equal to 100. Default is 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `request.recordMetadata?`        | `"commentCount"`\[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | An optional field that, if specified, includes commentCount on each record returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `request.returnFieldsByFieldId?` | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `request.sort?`                  | { `direction?`: [`Direction`](#direction); `field`: `string`; }\[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key specifying the name of the field to sort on, and an optional direction key that is either `asc` or `desc`. The default direction is `asc`. The sort parameter overrides the sorting of the view specified in the view parameter. If neither the sort nor the view parameter is included, the order of records is arbitrary.                                                                                                                                                                                              |
| `request.tableIdOrName`          | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `request.timeZone?`              | [`Timezone`](#timezone)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `request.typecast?`              | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.                                                                                                                                                                                                                                                                                                                                                                |
| `request.userLocale?`            | [`UserLocale`](#userlocale)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `request.view?`                  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The name or ID of a view in the table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view unless the `sort` parameter is included, which overrides that order. Fields hidden in this view will be returned in the results. To only return a subset of fields, use the `fields` parameter.                                                                                                                                                                                                                                                                           |

###### Returns

`Promise`<{ `offset?`: `string`; `records`: [`IndividualRecord`](#individualrecord)<`Fields`> & { `commentCount?`: `number`; }\[]; }>

Refer to [ListRecordsResponse](#listrecordsresponse).

## Interfaces

### CreateRecordsRequest

Defined in: packages/client-airtable/src/records/create-records.ts:26

Request data for creating records.

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](#recordfields) |

#### Properties

| Property                                                    | Type                                                  | Description                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="baseid"></a> `baseId`                                | `string`                                              | Identifier for the base.                                                                                                                                                                                                                                                |
| <a id="records"></a> `records`                              | \[{ `fields`: `Fields`; }, `...{ fields: Fields }[]`] | Records to create. Maximum of 10.                                                                                                                                                                                                                                       |
| <a id="returnfieldsbyfieldid"></a> `returnFieldsByFieldId?` | `boolean`                                             | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                |
| <a id="tableidorname"></a> `tableIdOrName`                  | `string`                                              | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                      |
| <a id="typecast"></a> `typecast?`                           | `boolean`                                             | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |

***

### CreateRecordsResponse

Defined in: packages/client-airtable/src/records/create-records.ts:41

Response for endpoint that create records.

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](#recordfields) |

#### Properties

| Property                         | Type                                                              | Description                                                                    |
| -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <a id="records-1"></a> `records` | { `createdTime`: `Date`; `fields`: `Fields`; `id`: `string`; }\[] | The records that were created. Refer to [IndividualRecord](#individualrecord). |

***

### DeleteRecordsRequest

Defined in: packages/client-airtable/src/records/delete-records.ts:15

Request data for deleting records.

#### Properties

| Property                                     | Type        | Description                                                                        |
| -------------------------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| <a id="baseid-1"></a> `baseId`               | `string`    | Identifier for the base.                                                           |
| <a id="records-2"></a> `records`             | `string`\[] | List of record IDs to delete. Maximum of 10.                                       |
| <a id="tableidorname-1"></a> `tableIdOrName` | `string`    | Identifier or name for the table. Preference is to use the ID which is unchanging. |

***

### DeleteRecordsResponse

Defined in: packages/client-airtable/src/records/delete-records.ts:34

Response data after deleting records.

#### Properties

| Property                         | Type                                         | Description                            |
| -------------------------------- | -------------------------------------------- | -------------------------------------- |
| <a id="records-3"></a> `records` | { `deleted`: `boolean`; `id`: `string`; }\[] | List of records that has been deleted. |

***

### GetRecordRequest

Defined in: packages/client-airtable/src/records/get-record.ts:26

Request data for getting the details of a single record.

#### Properties

| Property                                                      | Type                        | Description                                                                                                                                                              |
| ------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="baseid-2"></a> `baseId`                                | `string`                    | Identifier for the base.                                                                                                                                                 |
| <a id="cellformat-1"></a> `cellFormat?`                       | [`CellFormat`](#cellformat) | The format that should be used for cell values. Defaults to [CellFormat.JSON](#json).                                                                                    |
| <a id="recordid"></a> `recordId`                              | `string`                    | Identifier for the record.                                                                                                                                               |
| <a id="returnfieldsbyfieldid-1"></a> `returnFieldsByFieldId?` | `boolean`                   | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name. |
| <a id="tableidorname-2"></a> `tableIdOrName`                  | `string`                    | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                       |
| <a id="timezone-1"></a> `timeZone?`                           | [`Timezone`](#timezone)     | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.           |
| <a id="userlocale-1"></a> `userLocale?`                       | [`UserLocale`](#userlocale) | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.         |

***

### IndividualRecord

Defined in: packages/client-airtable/src/records/shared.ts:106

An individual record.

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](#recordfields) |

#### Properties

| Property                               | Type     | Description                                   |
| -------------------------------------- | -------- | --------------------------------------------- |
| <a id="createdtime"></a> `createdTime` | `Date`   | Date and time of when the record was created. |
| <a id="fields-3"></a> `fields`         | `Fields` | Fields of the records.                        |
| <a id="id"></a> `id`                   | `string` | Identifier for the record.                    |

***

### ListRecordsRequest

Defined in: packages/client-airtable/src/records/list-records.ts:45

Data for fetching the list of records.

#### Type Parameters

| Type Parameter              | Description                                  |
| --------------------------- | -------------------------------------------- |
| `Fields` *extends* `string` | Name of fields to include in resulting data. |

#### Properties

| Property                                                      | Type                                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="baseid-3"></a> `baseId`                                | `string`                                                           | Identifier for the base.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <a id="cellformat-2"></a> `cellFormat?`                       | [`CellFormat`](#cellformat)                                        | The format that should be used for cell values. Defaults to [CellFormat.JSON](#json).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| <a id="fields-5"></a> `fields?`                               | [`UnionToTuple`](#uniontotuple)<`Fields`>                          | Only data for fields whose names or IDs are in this list will be included in the result. If you don't need every field, you can use this parameter to reduce the amount of data transferred. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit.                                                                                                                                                                                                                                                                                        |
| <a id="filterbyformula"></a> `filterByFormula?`               | `string`                                                           | A formula used to filter records. The formula will be evaluated for each record, and if the result is not `0`, `false`, \`\`, `NaN`, `[]`, or `#Error!` the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request. If combined with the `view` parameter, only records in that view which satisfy the formula will be returned. Formulas can use field names, or field id's inside of the formula. Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. |
| <a id="maxrecords"></a> `maxRecords?`                         | `number`                                                           | The maximum total number of records that will be returned in your requests. If this value is larger than `pageSize` (which is 100 by default), you may have to load multiple pages to reach this total.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| <a id="offset"></a> `offset?`                                 | `string`                                                           | To fetch the next page of records, include offset from the previous request in the next request's parameters.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| <a id="pagesize"></a> `pageSize?`                             | `number`                                                           | The number of records returned in each request. Must be less than or equal to 100. Default is 100.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="recordmetadata"></a> `recordMetadata?`                 | `"commentCount"`\[]                                                | An optional field that, if specified, includes commentCount on each record returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| <a id="returnfieldsbyfieldid-2"></a> `returnFieldsByFieldId?` | `boolean`                                                          | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| <a id="sort"></a> `sort?`                                     | { `direction?`: [`Direction`](#direction); `field`: `string`; }\[] | A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key specifying the name of the field to sort on, and an optional direction key that is either `asc` or `desc`. The default direction is `asc`. The sort parameter overrides the sorting of the view specified in the view parameter. If neither the sort nor the view parameter is included, the order of records is arbitrary.                                                                                                                                                                                              |
| <a id="tableidorname-3"></a> `tableIdOrName`                  | `string`                                                           | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="timezone-2"></a> `timeZone?`                           | [`Timezone`](#timezone)                                            | The time zone that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| <a id="typecast-1"></a> `typecast?`                           | `boolean`                                                          | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.                                                                                                                                                                                                                                                                                                                                                                |
| <a id="userlocale-2"></a> `userLocale?`                       | [`UserLocale`](#userlocale)                                        | The user locale that should be used to format dates when using `string` as the `cellFormat`. This parameter is required when using `string` as the `cellFormat`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| <a id="view"></a> `view?`                                     | `string`                                                           | The name or ID of a view in the table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view unless the `sort` parameter is included, which overrides that order. Fields hidden in this view will be returned in the results. To only return a subset of fields, use the `fields` parameter.                                                                                                                                                                                                                                                                           |

***

### ListRecordsResponse

Defined in: packages/client-airtable/src/records/list-records.ts:128

Response data for the records that were requested.

#### Type Parameters

| Type Parameter                                     | Description                                |
| -------------------------------------------------- | ------------------------------------------ |
| `Fields` *extends* [`RecordFields`](#recordfields) | Mapping of fields to return to their type. |

#### Properties

| Property                         | Type                                                                                  | Description                                                                                                                               |
| -------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="offset-1"></a> `offset?`  | `string`                                                                              | If there are more records, the response will contain an offset. Pass this offset into the next request to fetch the next page of records. |
| <a id="records-4"></a> `records` | [`IndividualRecord`](#individualrecord)<`Fields`> & { `commentCount?`: `number`; }\[] | Refer to [IndividualRecord](#individualrecord).                                                                                           |

***

### UpdateRecordsRequestNonUpsert

Defined in: packages/client-airtable/src/records/update-records.ts:37

Request data for updating records.

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](#recordfields) |

#### Properties

| Property                                                      | Type                                                                              | Description                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="baseid-4"></a> `baseId`                                | `string`                                                                          | Identifier for the base.                                                                                                                                                                                                                                                |
| <a id="method"></a> `method`                                  | [`UpdateType`](#updatetype)                                                       | Method to use when updating data.                                                                                                                                                                                                                                       |
| <a id="records-5"></a> `records`                              | \[{ `fields`: `Fields`; `id`: `string`; }, `...{ fields: Fields; id: string }[]`] | List of records to update. Max of 10.                                                                                                                                                                                                                                   |
| <a id="returnfieldsbyfieldid-3"></a> `returnFieldsByFieldId?` | `boolean`                                                                         | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                |
| <a id="tableidorname-4"></a> `tableIdOrName`                  | `string`                                                                          | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                      |
| <a id="typecast-2"></a> `typecast?`                           | `boolean`                                                                         | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources. |

***

### UpdateRecordsRequestUpsert

Defined in: packages/client-airtable/src/records/update-records.ts:67

Request data for upserting records.

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](#recordfields) |

#### Properties

| Property                                                      | Type                                                  | Description                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="baseid-5"></a> `baseId`                                | `string`                                              | Identifier for the base.                                                                                                                                                                                                                                                          |
| <a id="method-1"></a> `method`                                | [`UpdateType`](#updatetype)                           | Method to use when updating data.                                                                                                                                                                                                                                                 |
| <a id="performupsert"></a> `performUpsert`                    | { `fieldsToMergeOn`: `string`\[]; }                   | Enables upsert behavior when set. `fieldsToMergeOn` will be used as an external ID to match records for updates. For records where no match is found, a new Airtable record will be created.                                                                                      |
| `performUpsert.fieldsToMergeOn`                               | `string`\[]                                           | An array with at least one and at most three field names or IDs. IDs must uniquely identify a single record. These cannot be computed fields (formulas, lookups, rollups), and must be one of the following types: number, text, long text, single select, multiple select, date. |
| <a id="records-6"></a> `records`                              | \[{ `fields`: `Fields`; }, `...{ fields: Fields }[]`] | List of records to update. Max of 10.                                                                                                                                                                                                                                             |
| <a id="returnfieldsbyfieldid-4"></a> `returnFieldsByFieldId?` | `boolean`                                             | An optional boolean value that lets you return field objects keyed by the field id. This defaults to false, which returns field objects where the key is the field name.                                                                                                          |
| <a id="tableidorname-5"></a> `tableIdOrName`                  | `string`                                              | Identifier or name for the table. Preference is to use the ID which is unchanging.                                                                                                                                                                                                |
| <a id="typecast-3"></a> `typecast?`                           | `boolean`                                             | The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.           |

***

### UpdateRecordsResponseNonUpsert

Defined in: packages/client-airtable/src/records/update-records.ts:110

Response data for updating records.

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](#recordfields) |

#### Properties

| Property                         | Type                                                 | Description                                     |
| -------------------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| <a id="records-7"></a> `records` | [`IndividualRecord`](#individualrecord)<`Fields`>\[] | Refer to [IndividualRecord](#individualrecord). |

***

### UpdateRecordsResponseUpsert

Defined in: packages/client-airtable/src/records/update-records.ts:125

Response data for upserting records.

#### Type Parameters

| Type Parameter                                     |
| -------------------------------------------------- |
| `Fields` *extends* [`RecordFields`](#recordfields) |

#### Properties

| Property                                     | Type                                                 | Description                                        |
| -------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| <a id="createdrecords"></a> `createdRecords` | `string`\[]                                          | List of identifiers for records that were created. |
| <a id="records-8"></a> `records`             | [`IndividualRecord`](#individualrecord)<`Fields`>\[] | Refer to [IndividualRecord](#individualrecord).    |
| <a id="updatedrecords"></a> `updatedRecords` | `string`\[]                                          | List of identifiers for records that were updated. |

## Type Aliases

### RecordFields

> **RecordFields** = `NonEmptyObject`<`Record`<`string`, `unknown`>>

Defined in: packages/client-airtable/src/records/shared.ts:13

The fields of a record.

***

### UnionToTuple

> **UnionToTuple**<`U`, `R`> = `{ [S in U]: Exclude<U, S> extends never ? [...R, S] : UnionToTuple<Exclude<U, S>, [...R, S]> }`\[`U`]

Defined in: packages/client-airtable/src/records/shared.ts:121

Helper type that given a union of strings, produces a type where all the possible options are elements of an array.
Useful to ensure that when a user specify the union, the user provides all those values.

#### Type Parameters

| Type Parameter             | Default type |
| -------------------------- | ------------ |
| `U` *extends* `string`     | -            |
| `R` *extends* `unknown`\[] | \[]          |

## Variables

### MAXIMUM\_RECORDS\_PER\_BATCH

> `const` **MAXIMUM\_RECORDS\_PER\_BATCH**: `10` = `10`

Defined in: packages/client-airtable/src/constants.ts:8

The maximum number of records that can be updated per batch request.

#### See

* <https://airtable.com/developers/web/api/update-multiple-records>
* <https://airtable.com/developers/web/api/create-records>
* <https://airtable.com/developers/web/api/delete-multiple-records>

***

### REQUESTS\_PER\_SECOND\_PER\_ACCESS\_TOKEN

> `const` **REQUESTS\_PER\_SECOND\_PER\_ACCESS\_TOKEN**: `50` = `50`

Defined in: packages/client-airtable/src/constants.ts:22

The maximum number of requests per second per access token.

#### See

<https://airtable.com/developers/web/api/rate-limits>

***

### REQUESTS\_PER\_SECOND\_PER\_BASE

> `const` **REQUESTS\_PER\_SECOND\_PER\_BASE**: `5` = `5`

Defined in: packages/client-airtable/src/constants.ts:15

The maximum number of requests per second per base.

#### See

<https://airtable.com/developers/web/api/rate-limits>
