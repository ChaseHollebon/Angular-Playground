import { Component } from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, ITextFilterParams, RowDoubleClickedEvent} from "ag-grid-community";
import {MyContractService} from "../../services/my-contract.service";
import {GridWithChipSelectionDTO} from "../../models/grid-with-chip-selection-dto";
import {SelectedReviewerDto} from "../../models/selected-reviewer-dto";

@Component({
  selector: 'app-grid-page-with-chip-selection',
  templateUrl: './grid-page-with-chip-selection.component.html',
  styleUrls: ['./grid-page-with-chip-selection.component.scss']
})
export class GridPageWithChipSelectionComponent {

  public gridApi: GridApi;
  public gridColumnApi: ColumnApi;
  public selectedReviewers: SelectedReviewerDto[] = [];
  public addReviewerInProgress: boolean = false;

  constructor(private myContractService: MyContractService) {
  }

  public gridOptions: GridOptions = {
    domLayout: 'normal',
    debug: false,
    rowModelType: 'clientSide',
    onRowDoubleClicked: (params: RowDoubleClickedEvent) => {
      this.addReviewer(params.data);
    },
  };

  public columnDefs: ColDef[] = [
    {
      field: 'user_id'
    },
    {
      field: 'full_name'
    },
    {
      field: 'title'
    },
    {
      field: 'primary_org'
    },
    {
      field: 'secondary_org'
    }
  ];

  private textFilterParams: ITextFilterParams = {
    filterOptions: ['contains', 'notContains'],
    caseSensitive: false,
    debounceMs: 200,
    maxNumConditions: 1
  }

  public defaultColumnDef: ColDef = {
    flex: 1,
    sortable: true,
    floatingFilter: true,
    filter: 'agTextColumnFilter',
    filterParams: this.textFilterParams
  }

  public onGridReady(aParams: GridReadyEvent) {
    this.gridApi = aParams.api;
    this.gridColumnApi = aParams.columnApi;

    this.gridApi.showLoadingOverlay();

    // Invoke the REST call to get the grid data
    this.myContractService.getContractReviewers().subscribe((aData: GridWithChipSelectionDTO[])=> {

      // REST call came back with data

      // Load the grid with data from the REST call
      this.gridApi.setRowData(aData);
    })
  }

  public addReviewer(aReviewer: GridWithChipSelectionDTO) {

    // Show a spinner so the user knows we're waiting for a REST call
    this.addReviewerInProgress = true;

    // Invoke REST call to the ADD contract reviewer
    this.myContractService.addContractReviewer(aReviewer.user_id).subscribe(()=> {
      // The REST call succeeded

      let newReviewer: SelectedReviewerDto = {
        user_id: aReviewer.user_id,
        full_name: aReviewer.full_name,
        remove_in_progress: false
      };

      // Add this reviewer to the array of reviewers
      this.selectedReviewers.push(newReviewer);
    }).add( () => {
      // REST Call finally block

      // Hide the spinner
      this.addReviewerInProgress = false;
    });
  }

  public removeReviewer(aIndexOfSelectedReviewerToRemove: number): void {
    let selectedReviewer: SelectedReviewerDto = this.selectedReviewers[aIndexOfSelectedReviewerToRemove];

    // Disable the reviewer
    selectedReviewer.remove_in_progress = true;

    // Invoke REST call to the REMOVE this contract reviewer
    this.myContractService.removeContractReviewer(selectedReviewer.user_id).subscribe(() => {
      // The REST call succeeded

      // REMOVE this reviewer to the array of reviewers
      this.removeUserIdFromArray(selectedReviewer.user_id);
    });
  }

  private removeUserIdFromArray(aUserId: number): void {
    let indexOfRemovedItem: number | null = null;

    for (let i: number=0; i<this.selectedReviewers.length; i++) {
      if (this.selectedReviewers[i].user_id == aUserId) {
        indexOfRemovedItem = i;
        break;
      }
    }

    if (indexOfRemovedItem != null) {
      this.selectedReviewers.splice(indexOfRemovedItem, 1);
    }

  }


}
