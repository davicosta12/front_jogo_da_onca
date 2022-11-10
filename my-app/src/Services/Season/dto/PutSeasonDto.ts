import GetBoardDto from "../../Board/dto/GetBoardDto";
import GetDogSkinDto from "../../Skins/dto/GetDogSkinDto";
import GetJaguarSkinDto from "../../Skins/dto/GetJaguarSkinDto";

export default interface PutSeasonDto {
    id: number,
    nome_season: string,
    inicio: string,
    fim: string,
    tabuleiro: GetBoardDto,
    skinsJaguar: GetJaguarSkinDto[],
    skinsDog: GetDogSkinDto[]
}