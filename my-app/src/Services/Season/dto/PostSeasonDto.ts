import GetBoardDto from "../../Board/dto/GetBoardDto";
import GetDogSkinDto from "../../Skins/dto/GetDogSkinDto";
import GetJaguarSkinDto from "../../Skins/dto/GetJaguarSkinDto";

export default interface PostSeasonDto {
  nome_season: string,
  inicio: string,
  fim: string,
  tabuleiros: GetBoardDto[],
  skinsJaguar: GetJaguarSkinDto[],
  skinsDog: GetDogSkinDto[]
}