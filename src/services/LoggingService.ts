import {ChatInputCommandInteraction, Interaction} from "discord.js";
import {Messages} from "../utils/Messages";

export class LoggingService {

    public static initializeLogFile() {
        require('child_process').exec("sudo rm -f /opt/logfile.txt", function () {});
        require('child_process').exec("sudo touch /opt/logfile.txt", function () {});
    }

    public static async logError(error: string, command: string, interaction: Interaction) {
        let user = "NO-USER";
        if (interaction.isChatInputCommand()) {
            interaction = <ChatInputCommandInteraction>interaction;
            let content = Messages.ATLAS_ERROR
            user = interaction.user.username;
            await interaction.reply({
                content,
                ephemeral: true
            });
        }
        let logMessage = Date.now() + "_" + command + "_" + user + ":" + error;
        require('child_process').exec("echo '" + logMessage + "' >> /opt/logfile.txt", function () {});
    }

    public static async log(message: string) {
        let logMessage = Date.now() + ":" + message;
        require('child_process').exec("echo '" + logMessage + "' >> /opt/logfile.txt", function () {});
    }
}