require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent]
});

client.on("messageCreate" , (message) => {
    if(message.author.bot) return;
    console.log(message.content);
    message.reply({
        content: "Sbhi bhaiya ne ram ram",
    });
});

client.on('interactionCreate' , interaction => {
    interaction.reply('Pong!!')
})

client.login(process.env.TOKEN);

