function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'roll',
    description: 'This is a command rolls a dice.',
    execute(message, args) {
        var temp = message.content.split(" ");
        if (temp.length == 1) {
            message.reply(" rolled " + "**" + getRandomInt(1, 6) + "**.");
        } else if (temp.length == 2 && Number.isInteger(temp[1])) {
            message.reply(" rolled " + "**" + getRandomInt(1, temp[1]) + "**.");
        } else if (temp.length == 3 && Number.isInteger(temp[1]) && Number.isInteger(temp[2])) {
            message.reply(" rolled " + "**" + getRandomInt(temp[1], temp[2]) + "**.");
        } else {
            message.channel.send("Wrong input!");
        }
    }
}
