import fs from 'fs';
import { pipeline } from 'stream/promises';

import axios from 'axios';
import * as tar from 'tar';

import Js5Index from '#/js5/Js5Index.ts';

type OpenRs2Xtea = {
    archive: number;
    group: number;
    name_hash: number;
    name: string;
    mapsquare: number;
    key: number[];
};

export default class OpenRs2 {
    static RS2_500 = new OpenRs2(726);

    id: number;
    keys: OpenRs2Xtea[] = [];
    mapIndex: Js5Index | null = null;

    constructor(id: number) {
        this.id = id;
    }

    async predownload() {
        fs.mkdirSync('data/cache', { recursive: true });

        if (!fs.existsSync('data/cache/flat-file.tar.gz')) {
            console.log('Downloading, please wait...');
            try {
                const writer = fs.createWriteStream('data/cache/flat-file.tar.gz');
                const req = await axios.get(`https://archive.openrs2.org/caches/runescape/${this.id}/flat-file.tar.gz`, { responseType: 'stream' });

                // we could pipe directly to tar but users might like to have the original cache around
                await pipeline(
                    req.data,
                    writer
                );
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                }

                return false;
            }
        }

        if (!fs.existsSync('data/cache/255/255.dat')) {
            console.log('Extracting, please wait...');
            await this.getGroup(255, 255); // not included in the flat-file archive!

            await pipeline(
                fs.createReadStream('data/cache/flat-file.tar.gz'),
                tar.x({
                    strip: 1,
                    C: 'data/cache',
                    keep: true
                })
            );
        }

        return true;
    }

    async getGroup(archive: number, group: number) {
        fs.mkdirSync(`data/cache/${archive}`, { recursive: true });
        if (fs.existsSync(`data/cache/${archive}/${group}.dat`)) {
            return Uint8Array.from(fs.readFileSync(`data/cache/${archive}/${group}.dat`));
        }

        try {
            const req = await axios.get(`https://archive.openrs2.org/caches/runescape/${this.id}/archives/${archive}/groups/${group}.dat`, { responseType: 'arraybuffer' });
            fs.writeFileSync(`data/cache/${archive}/${group}.dat`, req.data);
            return Uint8Array.from(req.data);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }

        return null;
    }

    async loadKeys() {
        fs.mkdirSync('data/cache', { recursive: true });
        if (fs.existsSync('data/cache/keys.json')) {
            this.keys = JSON.parse(fs.readFileSync('data/cache/keys.json', 'ascii'));
            return;
        }

        try {
            console.log('Downloading map keys');
            const req = await axios.get(`https://archive.openrs2.org/caches/runescape/${this.id}/keys.json`, { responseType: 'text' });
            fs.writeFileSync('data/cache/keys.json', req.data);
            this.keys = JSON.parse(req.data);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    }

    async loadMapIndex() {
        const index = await this.getGroup(255, 5);
        if (!index) {
            return;
        }

        this.mapIndex = new Js5Index(false, false);
        this.mapIndex.decode(index);
    }

    getKey(x: number, z: number) {
        const entry = this.getKeyEntry(x, z);
        if (!entry) {
            return [0, 0, 0, 0];
        } else {
            return entry.key;
        }
    }

    getKeyEntry(x: number, z: number) {
        const id = x << 8 | z;

        return this.keys.find(k => k.mapsquare === id);
    }

    hasKey(x: number, z: number) {
        return typeof this.getKeyEntry(x, z) !== 'undefined';
    }

    getMapGroupId(prefix: 'm' | 'l', x: number, z: number) {
        return this.mapIndex?.getGroupId(`${prefix}${x}_${z}`) ?? -1;
    }

    canLoadLocGroupWithoutKey(x: number, z: number) {
        const group = this.getMapGroupId('l', x, z);
        if (group === -1 || this.hasKey(x, z)) {
            return true;
        }

        const file = `data/cache/5/${group}.dat`;
        if (!fs.existsSync(file)) {
            return false;
        }

        try {
            Js5Index.decompress(Uint8Array.from(fs.readFileSync(file)));
            return true;
        } catch (err) {
            return false;
        }
    }

    getMissingKeysForRebuild(absX: number, absZ: number) {
        const zx = absX >> 3;
        const zz = absZ >> 3;

        const missing: { x: number, z: number, mapsquare: number }[] = [];
        for (let mx = (zx - 6) >> 3; mx <= (zx + 6) >> 3; mx++) {
            for (let mz = (zz - 6) >> 3; mz <= (zz + 6) >> 3; mz++) {
                if (!this.canLoadLocGroupWithoutKey(mx, mz)) {
                    missing.push({ x: mx, z: mz, mapsquare: mx << 8 | mz });
                }
            }
        }

        return missing;
    }
}
