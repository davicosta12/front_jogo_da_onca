import { GetSummarySeasonDto } from "../../Season/dto/GetSeasonDto";

export default interface GetJaguarSkinDto {
    id: number,
    name_skin: string,
    season: GetSummarySeasonDto,
    img_skin: string
}