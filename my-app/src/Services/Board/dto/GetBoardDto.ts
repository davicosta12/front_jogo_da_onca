import { GetSummarySeasonDto } from "../../Season/dto/GetSeasonDto"

export default interface GetBoardDto {
    id: number,
    season: GetSummarySeasonDto,
    name_tabuleiro: string,
    img_tabuleiro: string
}