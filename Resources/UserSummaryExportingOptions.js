const USER_SUMMARY_TABLE_ID = "userIdCountTable";
const FILE_NAME = "Bin User Summary";

function tableToCSV() {
 
            var csv_data = [];
 
            // Get all table rows
            const tableRows = document.getElementById(USER_SUMMARY_TABLE_ID).rows;
            for (var i = 0; i < tableRows.length; i++) {
 
                // Get column data
                var tableColumn = tableRows[i].querySelectorAll('td,th');
 
                var csv_row = [];
                for (var j = 0; j < tableColumn.length; j++) {
 
                    // Get the data from the current cell and save to csv_row
                    csv_row.push(tableColumn[j].innerHTML);
                }
 
                // Join each column value with ','
                csv_data.push(csv_row.join(","));
            }
 
            // Each row must end with a new line
            csv_data = csv_data.join('\n');
 
            // Call function to trigger download
            downloadCSV(csv_data);
 
}
 
function downloadCSV(csv_data) {
 
            // Create CSV file
            const csv_file = new Blob([csv_data], {type: 'text/csv'});
 
            // Create download link
            var download_link = document.createElement('a');
 
            // Download created file
            download_link.download = FILE_NAME + ".csv";
            const url = window.URL.createObjectURL(csv_file);
            download_link.href = url;
 
            // Make sure link is not displayed to users
            download_link.style.display = "none";
            document.body.appendChild(download_link);
 
            // Trigger download and delete temporary download link
            download_link.click();
            document.body.removeChild(download_link);
}

function tableToXLS(){

          const data_type = 'application/vnd.ms-excel';
          // Get table and format content
          const data_table = document.getElementById(USER_SUMMARY_TABLE_ID).outerHTML.replace(/ /g, '%20');
          
          // Create download link
          var download_link = document.createElement("a");
          document.body.appendChild(download_link);
          
          if(navigator.msSaveOrOpenBlob){
              var blob = new Blob(['\ufeff', data_table], {
                  type: data_type
              });
              navigator.msSaveOrOpenBlob( blob, FILE_NAME + ".xls");
          }else{
              // Create a link to the file
              download_link.href = 'data:' + data_type + ', ' + data_table;
              download_link.download = FILE_NAME + ".xls";
              
              // Trigger download and delete temporary link
              download_link.click();
              document.body.removeChild(download_link);
          }
          
}

function tableToXLSX() {
    
            // Relies on table2excel library found in table2excel.js
            var table2excel = new Table2Excel();
            table2excel.export(document.getElementById(USER_SUMMARY_TABLE_ID), FILE_NAME);
            
}