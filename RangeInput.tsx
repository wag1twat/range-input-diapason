import React from 'react'
import classes from './range.module.scss'
import clsx from 'clsx'
interface IProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  min: number
  max: number
  maxSafe: number
  minSafe: number
  mousing(triggering: boolean): void
}
interface IState {
  inputLeftValue: number
  inputRightValue: number
  percentLeft: number
  percentRight: number
  maxSafe: number
  minSafe: number
}
export class RangeInput extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      inputLeftValue: 0,
      inputRightValue: 100,
      percentLeft: 0,
      percentRight: 0,
      maxSafe: 0,
      minSafe: 0,
    }
    this.setLeftValue = this.setLeftValue.bind(this)
    this.setRightValue = this.setRightValue.bind(this)
  }
  inputLeft = React.createRef<HTMLInputElement>()
  inputRight = React.createRef<HTMLInputElement>()
  thumbLeft = React.createRef<HTMLDivElement>()
  thumbRight = React.createRef<HTMLDivElement>()
  range = React.createRef<HTMLDivElement>()
  componentDidMount() {
    this.setLeftValue(null)
    this.setRightValue(null)
    this.inputLeft.current?.addEventListener('mousedown', this.mousing(true))
    this.inputLeft.current?.addEventListener('mouseup', this.mousing(false))
    this.inputRight.current?.addEventListener('mousedown', this.mousing(true))
    this.inputRight.current?.addEventListener('mouseup', this.mousing(false))
  }
  componentWillUnmount() {
    this.inputLeft.current?.removeEventListener('mousedown', this.mousing(true))
    this.inputLeft.current?.removeEventListener('mouseup', this.mousing(false))
    this.inputRight.current?.removeEventListener(
      'mousedown',
      this.mousing(true)
    )
    this.inputRight.current?.removeEventListener('mouseup', this.mousing(false))
  }
  mousing = (triggering: boolean) => (event: any) =>
    this.props.mousing(triggering)
  setLeftValue(event: React.ChangeEvent<HTMLInputElement> | null) {
    if (
      this.inputLeft &&
      this.inputLeft.current &&
      this.inputRight &&
      this.inputRight.current &&
      this.thumbLeft &&
      this.thumbLeft.current &&
      this.range &&
      this.range.current
    ) {
      const min = parseInt(this.inputLeft.current.min)
      const max = parseInt(this.inputLeft.current.max)
      const value = Math.min(
        parseInt(this.inputLeft.current.value),
        parseInt(this.inputRight.current.value) - 1
      )
      const percent =
        ((parseInt(this.inputLeft.current.value) - min) / (max - min)) * 100
      const calculateValue =
        (this.props.maxSafe / 100) * percent < this.props.minSafe
          ? this.props.minSafe
          : (this.props.maxSafe / 100) * percent
      if (event) {
        this.props.onChange({
          //@ts-ignore
          target: {
            name: 'min',
            //@ts-ignore
            value: calculateValue.toFixed(2),
          },
        })
      }
      this.setState((prevState) => ({
        inputLeftValue: value,
        percentLeft: percent,
      }))
    } else return null
  }
  setRightValue(event: React.ChangeEvent<HTMLInputElement> | null) {
    if (
      this.inputLeft &&
      this.inputLeft.current &&
      this.inputRight &&
      this.inputRight.current &&
      this.thumbLeft &&
      this.thumbLeft.current &&
      this.range &&
      this.range.current
    ) {
      const min = parseInt(this.inputRight.current.min)
      const max = parseInt(this.inputRight.current.max)
      const value = Math.max(
        parseInt(this.inputRight.current.value),
        parseInt(this.inputLeft.current.value) + 1
      )
      const percent =
        100 -
        ((parseInt(this.inputRight.current.value) - min) / (max - min)) * 100
      const calculateValue = (this.props.maxSafe / 100) * (100 - percent)
      if (event) {
        this.props.onChange({
          //@ts-ignore
          target: {
            name: 'max',
            //@ts-ignore
            value: calculateValue.toFixed(2),
          },
        })
      }
      this.setState((prevState) => ({
        inputRightValue: value,
        percentRight: percent,
      }))
    } else return null
  }
  render() {
    const {
      inputLeftValue,
      inputRightValue,
      percentLeft,
      percentRight,
    } = this.state
    const left = `${percentLeft}%`
    const right = `${percentRight}%`
    const rangeWidth = `calc(100% - ${percentLeft + percentRight}%)`
    return (
      <div className={classes.root}>
        <div className={classes.range}>
          <input
            ref={this.inputLeft}
            name="min"
            type="range"
            min="0"
            max="100"
            value={inputLeftValue}
            onChange={this.setLeftValue}
          />
          <input
            ref={this.inputRight}
            name="max"
            type="range"
            min="0"
            max="100"
            value={inputRightValue}
            onChange={this.setRightValue}
          />
          <div className={classes.slider}>
            <div className={classes.track}></div>
            <div
              ref={this.range}
              className={classes.range}
              style={{
                left,
                width: rangeWidth,
              }}
            ></div>
            <div
              ref={this.thumbLeft}
              className={clsx(classes.thumb, classes.left)}
              style={{
                left,
              }}
            ></div>
            <div
              ref={this.thumbRight}
              className={clsx(classes.thumb, classes.right)}
              style={{
                right,
              }}
            ></div>
          </div>
        </div>
      </div>
    )
  }
}
