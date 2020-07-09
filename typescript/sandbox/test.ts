class TestMap {

    getMap(): TestMap {
        let map = new Map();
        map.set('key', new TestMap());
        return map.get('key');
    }
}

console.log(new TestMap().getMap());