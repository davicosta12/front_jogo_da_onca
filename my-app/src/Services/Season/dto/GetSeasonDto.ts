import GetBoardDto from "../../Board/dto/GetBoardDto";
import GetDogSkinDto from "../../Skins/dto/GetDogSkinDto";
import GetJaguarSkinDto from "../../Skins/dto/GetJaguarSkinDto";

export default interface GetSeasonDto {
    id: number,
    nome_season: string,
    inicio: string,
    fim: string,
    tabuleiro: GetBoardDto,
    skinJaguar: GetJaguarSkinDto,
    skinDog: GetDogSkinDto
}