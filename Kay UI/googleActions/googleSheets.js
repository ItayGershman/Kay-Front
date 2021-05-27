const KayAPI = require("../KayAPI")
const { getLaser } = require('../Laser.js')
const { exec } = require('child_process');

const getEquipment = async (value) => {
    console.log('value:', value)
    console.log('entity: ', value['equipment:equipment'][0].body)
    const equipment = value['equipment:equipment'][0].body
    try {
        const { data } = await KayAPI.getEquipments();
        const coordinates = {}
        const isValueFound = data.feed.entry.find((elem, i) => {
            if (elem.content["$t"].toLowerCase().includes(equipment)) {
                const coord = data.feed.entry[i + 2].content["$t"]
                coordinates["x"] = coord.split(",")[0]
                coordinates["y"] = coord.split(",")[1]
                return true
            }
        })
        console.log("before func X:", coordinates.x)
        console.log("before func Y:", coordinates.y)
        await exec(`python Calibrate1.py ${coordinates.x} ${coordinates.y}`)
        // getLaser(coordinates.x, coordinates.y)
        console.log('isValueFound: ', isValueFound)
        return `Look at the red dot, i'm pointing on ${equipment} `
    }
    catch (e) {
        console.log(e)
        return `Sorry, couldn't find ${equipment} in the center `
    }
}

module.exports = getEquipment;