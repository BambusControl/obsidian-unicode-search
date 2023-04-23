import {Storage} from "./storage/storage";
import {DataService} from "./data.service";

export class ConstantStorage implements Storage {

	public constructor(
		private readonly dataService: DataService,
	) {
	}

	public async getAll(): Promise<any> {
		return await this.dataService.getData();
	}

}
