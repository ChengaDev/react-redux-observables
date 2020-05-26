import { of, EMPTY } from 'rxjs'
import {
  switchMap,
  mergeMap,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { getJSON } from '../utils/ajaxUtils'
import Actions from '../actions'

const minSearchQueryLength = 3

const URLS = {
  DATA: 'https://ops.avonow.com/api/v1/products/search?by_company_id=2&query='
}

let cachedResponses = {}

export const requestTabOneDataEpic = action$ =>
  action$.pipe(
    ofType(Actions.TAB_ONE_DATA_REQUESTED),
    debounceTime(500),
    map(action => action.payload),
    distinctUntilChanged(),
    switchMap(payload => {
      if (cachedResponses[payload]) {
        return of(Actions.tabOneDataReceived(cachedResponses[payload]))
      } else if (!payload || payload.length < minSearchQueryLength) {
        return of(Actions.tabOneDataReceived(EMPTY))
      } else {
        return getJSON(URLS.DATA + payload).pipe(
          mergeMap(({ products }) => {
            cachedResponses[payload] = products
            return of(Actions.tabOneDataReceived(products))
          }),
          catchError(error => of(Actions.fetchRejected(error)))
        )
      }
    })
  )
