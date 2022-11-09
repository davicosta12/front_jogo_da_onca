import { GetSummarySeasonDto } from "../../Season/dto/GetSeasonDto"

export default interface GetDogSkinDto {
    id: number,
    season: GetSummarySeasonDto,
    name_skin: string,
    img_skin: string
}