const KayAPI = require("../KayAPI")
const { getLaser } = require('../Laser.js')

const getEquipment = async (value) => {
    console.log('entity: ', value['equipment:equipment'][0].body)
    const equipment = value['equipment:equipment'][0].body
    try {
        const { data } = await KayAPI.getEquipments();
        const coordinates = {}
        const isValueFound = data.feed.entry.find((elem, i) => {
            console.log(elem.content["$t"].toLowerCase())
            if (elem.content["$t"].toLowerCase().includes(equipment)) {
                console.log("INSIDE IF")
                const coord = data.feed.entry[i + 6].content["$t"]
                coordinates["x"] = coord.split(",")[0]
                coordinates["y"] = coord.split(",")[1]
                return true
            }
        })
        console.log("before func X:", coordinates.x)
        console.log("before func Y:", coordinates.y)

        getLaser(coordinates.x, coordinates.y)
        console.log('isValueFound: ', isValueFound)
        return 'Lenovo yoga is my Proffesional computer!'
    }
    catch (e) {
        console.log(e)
        return `${equipment} is not found in the center `
    }
}

module.exports = getEquipment;