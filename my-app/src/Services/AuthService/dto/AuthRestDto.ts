export default class AuthRequestDto {
    constructor(
        public email: string,
        public nome: string,
        public password: string,
    ) { }
}