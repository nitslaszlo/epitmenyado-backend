import HttpException from "./HttpException";

export default class UserNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Ezzel az azonosítóval (${id}) nincs felhasználó!`);
    }
}
