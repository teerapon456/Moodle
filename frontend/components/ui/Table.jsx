
import React from 'react';
import PropTypes from 'prop-types';

export function Table({ 
  data = [], 
  columns = [], 
  loading = false, 
  emptyMessage = 'No data available', 
  className = '' 
}) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📭</div>
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl ${className}`}>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {column.title}
                {column.sortable && (
                  <span className="ml-1 cursor-pointer hover:text-[#A21D21] dark:hover:text-[#C92828]">
                    ↕
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func
    })
  ),
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  className: PropTypes.string
};
