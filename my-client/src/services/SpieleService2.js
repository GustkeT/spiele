import spiele from './spiele.json';

export default class SpieleService {
    static getSpiele() {
        return spiele ? spiele : [];
    }
}
