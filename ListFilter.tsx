import React from 'react'
import classes from './classes.module.scss'
import { isArrays, isNotNaNs } from '../../../store/helpers'
import { FilterArrowDownIcon } from '../../../styleguide/icons/icons'
import { IListFilter } from './types'
import clsx from 'clsx'

export const ListFilter: React.FC<IListFilter> = React.memo(
  ({ data, ids, label, filterName, onChange }) => {
    const [visible, setVisible] = React.useState<boolean>(false)
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
        {!visible && data && isArrays(data) && (
          <ul className={classes.root__list}>
            {data.map((d) => {
              const name = String(d.id)
              const id = `data-filter-${filterName}-${d.id}`
              const checked = !!ids.find((f) => f.id === d.id)
              return (
                <li key={d.id}>
                  {d.name && <label htmlFor={id}>{d.name}</label>}
                  {d.value && <label htmlFor={id}>{d.value}</label>}
                  <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)
