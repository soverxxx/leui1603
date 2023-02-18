import { Component, linkEvent } from "inferno";
import { SortType } from "lemmy-js-client";
import { i18n } from "../../i18next";
import { randomStr, relTags, sortingHelpUrl } from "../../utils";
import { Icon } from "./icon";

interface SortSelectProps {
  sort: SortType;
  onChange?(val: SortType): any;
  hideHot?: boolean;
  hideMostComments?: boolean;
}

interface SortSelectState {
  sort: SortType;
}

export class SortSelect extends Component<SortSelectProps, SortSelectState> {
  private id = `sort-select-${randomStr()}`;
  private emptyState: SortSelectState = {
    sort: this.props.sort,
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = this.emptyState;
  }

  static getDerivedStateFromProps(props: any): SortSelectState {
    return {
      sort: props.sort,
    };
  }

  render() {
    return (
      <>
        <select
          id={this.id}
          name={this.id}
          value={this.state.sort}
          onChange={linkEvent(this, this.handleSortChange)}
          class="custom-select w-auto mr-2 mb-2"
          aria-label={i18n.t("sort_type")}
        >
          <option disabled aria-hidden="true">
            {i18n.t("sort_type")}
          </option>
          {!this.props.hideHot && [
            <option value={SortType.Hot}>{i18n.t("hot")}</option>,
            <option value={SortType.Active}>{i18n.t("active")}</option>,
          ]}
          <option value={SortType.New}>{i18n.t("new")}</option>
          {!this.props.hideMostComments && [
            <option value={SortType.MostComments}>
              {i18n.t("most_comments")}
            </option>,
            <option value={SortType.NewComments}>
              {i18n.t("new_comments")}
            </option>,
          ]}
          <option disabled aria-hidden="true">
            ─────
          </option>
          <option value={SortType.TopDay}>{i18n.t("top_day")}</option>
          <option value={SortType.TopWeek}>{i18n.t("top_week")}</option>
          <option value={SortType.TopMonth}>{i18n.t("top_month")}</option>
          <option value={SortType.TopYear}>{i18n.t("top_year")}</option>
          <option value={SortType.TopAll}>{i18n.t("top_all")}</option>
        </select>
                  {!this.context.router.history.location.pathname.match(
              /^\/search/
            ) && (
              <form
                class="form-inline mr-2"
                onSubmit={linkEvent(this, this.handleSearchSubmit)}
              >
                <input
                  id="search-input"
                  class={`form-control mr-0 search-input ${
                    this.state.toggleSearch ? "show-input" : "hide-input"
                  }`}
                  onInput={linkEvent(this, this.handleSearchParam)}
                  value={this.state.searchParam}
                  ref={this.searchTextField}
                  type="text"
                  placeholder={i18n.t("search")}
                  onBlur={linkEvent(this, this.handleSearchBlur)}
                ></input>
                <label class="sr-only" htmlFor="search-input">
                  {i18n.t("search")}
                </label>
                <button
                  name="search-btn"
                  onClick={linkEvent(this, this.handleSearchBtn)}
                  class="px-1 btn btn-link"
                  style="color: var(--gray)"
                  aria-label={i18n.t("search")}
                >
                  <Icon icon="search" />
                </button>
              </form>
            )}
      </>
    );
  }

  handleSortChange(i: SortSelect, event: any) {
    i.props.onChange(event.target.value);
  }
}
