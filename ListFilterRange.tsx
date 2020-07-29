import React from 'react'
import classes from './classes.module.scss'
import { FilterArrowDownIcon } from '../../../styleguide/icons/icons'
import { IListFilterRange } from './types'
import { RangeInput } from './RangeInput'
import { TPriceRangesFilter } from '../../../store/reducers/goods/typesData'
import clsx from 'clsx'

export const ListFilterRange: React.FC<IListFilterRange> = React.memo(
  ({
    data,
    safe,
    ranges,
    label,
    filterName,
    onChange,
    mousing,
    onChangeRange,
  }) => {
    const [visible, setVisible] = React.useState<boolean>(false)
    const min = data?.min || 0
    const max = data?.max || 0
    const minSafe = safe?.min || 0
    const maxSafe = safe?.max || 0
    //@ts-ignore
    const onChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(+event.target.value) && +event.target.value < minSafe) {
        return onChange(event)
      }
    }
    const onChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isNaN(+event.target.value) && +event.target.value < maxSafe) {
        return onChange(event)
      }
    }
    const onChangeCheckBox = (range: TPriceRangesFilter, checked: boolean) => (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      !checked && onChangeRange(range)
      checked && data && onChangeRange({ min: minSafe, max: maxSafe, name: '' })
    }
    const color = !visible ? '#009bde' : '#000'
    return (
      <div className={classes.root}>
        <button
          className={classes.root__select}
          onClick={() => setVisible((visible) => !visible)}
        >
          <span
            style={{
              color,
            }}
          >
            {label}
          </span>
          <span>
            <FilterArrowDownIcon />
          </span>
        </button>
        {!visible && (
          <div className={classes.root__range}>
            <input
              type="text"
              name="min"
              value={min}
              min={0}
              max={min}
              onChange={(event) => onChangeMin(event)}
            />
            <input
              type="text"
              name="max"
              value={max}
              min={min}
              max={max}
              onChange={(event) => onChangeMax(event)}
            />
          </div>
        )}
        {!visible && (
          <RangeInput
            onChange={onChange}
            min={min}
            max={max}
            minSafe={minSafe}
            maxSafe={maxSafe}
            mousing={mousing}
          />
        )}
        {!visible && ranges && Array.isArray(ranges) && (
          <div className={classes.root__checkbox_list}>
            {ranges.map((d, index) => {
              const checked = data?.max === d.max
              return (
                <div key={index} className={classes.root__checkbox_list__box}>
                  <label
                    className={clsx({
                      [classes.active]: checked,
                      [classes.unactive]: !checked,
                    })}
                    htmlFor={String(index)}
                  >
                    {d.name}
                  </label>
                  <input
                    checked={checked}
                    id={String(index)}
                    type="checkbox"
                    onChange={onChangeCheckBox(d, checked)}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)
