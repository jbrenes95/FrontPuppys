import themes from "./themes.json"
import {colors} from "quasar"

function getTheme(name) {
    return themes[name]
    
}

function changeTheme(name){
    const theme = getTheme(name);

    for (const [label, color] of Object.entries(theme)) {
      colors.setBrand(label, color);
    }
}

  
  export { themes, getTheme,changeTheme };