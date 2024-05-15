export default function getShufflePic() {
  const returnArray: SquareData[] = [];
  for (let i = 1; i <= 16; i++)
    returnArray.push({ id: i, src: `/Shuffle/${i}.png` });
  return returnArray;
}
