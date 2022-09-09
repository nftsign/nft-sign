"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUsage = void 0;
const showUsage = () => {
    console.log("\n");
    console.log("███╗░░██╗███████╗████████╗░░░░░░░██████╗██╗░██████╗░███╗░░██╗");
    console.log("████╗░██║██╔════╝╚══██╔══╝░░░░░░██╔════╝██║██╔════╝░████╗░██║");
    console.log("██╔██╗██║█████╗░░░░░██║░░░█████╗╚█████╗░██║██║░░██╗░██╔██╗██║");
    console.log("██║╚████║██╔══╝░░░░░██║░░░╚════╝░╚═══██╗██║██║░░╚██╗██║╚████║");
    console.log("██║░╚███║██║░░░░░░░░██║░░░░░░░░░██████╔╝██║╚██████╔╝██║░╚███║");
    console.log("╚═╝░░╚══╝╚═╝░░░░░░░░╚═╝░░░░░░░░░╚═════╝░╚═╝░╚═════╝░╚═╝░░╚══╝");
    console.log("\n\nUsage patterns: \n");
    console.log("\tnpx nft-sign <img.png>\n");
    console.log("\tnpx nft-sign --verify <img.signed.png> \n\n");
};
exports.showUsage = showUsage;
