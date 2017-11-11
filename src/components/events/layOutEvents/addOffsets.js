export default function addOffsets(rows) {
  return rows.map(row =>
    row.map((event, index, row) => {
      if (event.offset === undefined) {
        event.offset = index;
      } else if (event.offset !== index) {
        const temp = row[event.offset];
        temp.offset = index;
        row[event.offset] = event;
        event = temp;
      }
      return event;
    })
  );
};