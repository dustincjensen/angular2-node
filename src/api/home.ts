import { Api } from './_api';
import { proxyType, generateProxy, proxyMethod } from './_proxyDecorators';

@proxyType()
export class GiveMeData {
    paramOne: string;
    paramTwo?: string;
}

@proxyType()
export class TakeThatData {
    stuff: GiveMeData;
}

@generateProxy('/api/home/')
export class HomeApi extends Api {

    private _futureDatabaseRef: any = {
        homeMessageOne: 'Home',
        homeMessageTwo: 'FromPrivateRef'
    };

    constructor() {
        super();
    }

    @proxyMethod()
    private async getHomeDashboard(): Promise<TakeThatData> {
        return {
            stuff: {
                paramOne: this._futureDatabaseRef.homeMessageOne,
                paramTwo: this._futureDatabaseRef.homeMessageTwo
            }
        };
    }

    @proxyMethod()
    private async giveMeData(payload: GiveMeData): Promise<GiveMeData> {
        return {
            paramOne: 'I gave you new data',
            paramTwo: JSON.stringify(payload)
        }
    }
}