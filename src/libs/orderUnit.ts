export const Geo = (sub:string)=>{
    var array: string[] = [];

    if (sub.match("Human geography")) {
        array = [
          "Population geography",
          "Cultural geography",
          "Economic geography",
          "Geography of Agricultural and food",
          "Urban geography",
          "Geography of tourism",
          "Geography of development",
        ];
      } else if (sub.match("Physical geography")) {
        array = [
          "Earth and landforms",
          "Natural resource and management",
          "Climate and climate change",
          "Environmental geography",
          "Natural hazards and Disaster management",
          "",
          ""
        ];
      } else if (sub.match("Geography Techniques")) {
        array = [
          "Map",
          "Aerial photo and Interpretation",
          "Remote sensing",
          "Geographic information",
          "Global positioning system",
          "Fieldwork",
          "Data analysis",
        ];
      }

    return array;
}