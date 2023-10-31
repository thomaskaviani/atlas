import {ChatInputCommandInteraction, Client, SlashCommandStringOption} from "discord.js";
import {Command} from "./Command";
import {Messages} from "../utils/Messages";
import {BoardgameService} from "../services/BoardgameService";
import {AtlasService} from "../services/AtlasService";

export const RemoveGameCommand: Command = {
    name: "remove-game",
    description: "Removes you as an owner of a boardgame",
    options: [new SlashCommandStringOption()
        .setName("name")
        .setDescription("Enter the boardgame name")
        .setRequired(true)],
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        let boardgame = interaction.options.get("name").value;

        if (typeof boardgame === "string" && boardgame) {
            boardgame = boardgame.toLowerCase();
            if (await BoardgameService.doesOwnerHaveGame(boardgame, interaction.user.username)) {
                await BoardgameService.deleteCollectionLine(boardgame, interaction.user.username);
                const content = Messages.REMOVED_FROM_GAME + boardgame
                await interaction.reply({
                    content,
                    ephemeral: true
                });
                await AtlasService.updateAtlasMessage(client);
            } else {
                const content = Messages.DONT_OWN_GAME_MESSAGE + boardgame;
                await interaction.reply({
                    content,
                    ephemeral: true
                });
            }
        }
    }
};