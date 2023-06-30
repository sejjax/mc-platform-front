import React from 'react';

export function headerFormatter(column, colIndex, { sortElement }) {
  return (
    <div className="head-column">
      <p>{column.text}</p>
      {sortElement}
    </div>
  );
}

export function headerFormatterCenteredTitle(column, colIndex, { sortElement }) {
  return (
    <div className="head-column centered_title">
      <p>{column.text}</p>
      {sortElement}
    </div>
  );
}

export const addHeaderFormatterToTableColumns = (array, formatter = headerFormatter) =>
  array.map((item) => ({ ...item, headerFormatter: formatter }));
