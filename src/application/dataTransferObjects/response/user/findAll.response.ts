import { GetByIdResponse } from "./getById.response";

export class FindAllResponse {
    constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly data: GetByIdResponse[]
    ) { }
}