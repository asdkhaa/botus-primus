module.exports = {
    name: 'code',
    description: 'Can be used for sharing GitHub codes',
    execute(message, args, fetch) {
        var url = "https://cdn.jsdelivr.net/gh/SparrowDivision/aoc2020/main/day_10/day10.py";
        fetch(url).then(d => d.text());
        message.reply("```py\n" + d + "```");
    }
}
