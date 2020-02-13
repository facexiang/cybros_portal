import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    const normalColumns = [
      {"data": "employee_name"},
      {"data": "clerk_code"},
      {"data": "belong_company_name"},
      {"data": "belong_department_name"},
      {"data": "contract_belong_company"},
      {"data": "stamp_to_place"},
      {"data": "stamp_comment"},
      {"data": "item_action", bSortable: false}
    ];

    $('#public-rental-housings-lists-datatable').dataTable({
      "processing": true,
      "serverSide": true,
      "autoWidth": false,
      "ajax": $('#public-rental-housings-lists-datatable').data('source'),
      "pagingType": "full_numbers",
      "columns": normalColumns,
      stateSave: true,
      stateSaveCallback: function(settings, data) {
          localStorage.setItem('DataTables_public_rental_housings_lists', JSON.stringify(data));
        },
      stateLoadCallback: function(settings) {
        return JSON.parse(localStorage.getItem('DataTables_public_rental_housings_lists'));
        }
    });
  }

  disconnect() {
    $('#public-rental-housings-lists-datatable').DataTable().destroy();
  }
}