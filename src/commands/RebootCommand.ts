import {ChatInputCommandInteraction, Client, SlashCommandStringOption} from "discord.js";
import {Command} from "./Command";
import {Messages} from "../utils/Messages";

export const RebootCommand: Command = {
    name: "reboot",
    description: "Reboots A.T.L.A.S.",
    options: null,
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        let content = ''
        console.log(interaction.options.get("password").value);
        if (interaction.user.username == "thomaskaviani") {
            const content = Messages.ATLAS_REBOOT_MESSAGE;
            await interaction.followUp({
                ephemeral: true,
                content
            });
            require('child_process').exec('sudo reboot', function (msg) {
                console.log(msg)
            });
        } else {
            const content = Messages.ATLAS_NOT_ALLOWED;
            await interaction.followUp({
                ephemeral: true,
                content
            });
        }
    }
};