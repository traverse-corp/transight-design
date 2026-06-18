import React, { Children, useState, type Dispatch, type SetStateAction } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckIcon } from 'lucide-react'
import { Button } from './button'
import { twMerge } from 'tailwind-merge'

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

/**
 * Stepper 컴포넌트 Props
 * @property children - Step 컴포넌트들
 * @property curStep - 현재 단계 (1-based index)
 * @property onStepChange - 단계 변경 핸들러
 * @property onComplete - 모든 단계 완료 시 호출되는 콜백
 * @property backButtonText - 이전 버튼 텍스트
 * @property nextButtonText - 다음 버튼 텍스트
 */
interface StepperProps {
  children: React.ReactNode
  curStep: number
  onStepChange: Dispatch<SetStateAction<number>>
  onComplete?: () => void
  backButtonText?: string
  nextButtonText?: string
  nextButtonProps?: React.ComponentPropsWithoutRef<'button'>
}

/**
 * 개별 Step 컴포넌트 Props
 * @property label - 단계 설명 레이블
 * @property children - 단계별 콘텐츠
 */
interface StepProps {
  label: string
  children: React.ReactNode
}

interface StepperButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
  buttonType: 'NEXT' | 'PREV'
  className?: string
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

/**
 * Stepper 컴포넌트
 * - 단계별 진행 상황을 표시하고 콘텐츠를 전환합니다.
 * - 이전/다음 버튼을 제공하여 단계를 이동합니다.
 */
const Stepper = ({ children, curStep, onStepChange }: StepperProps) => {
  // 콘텐츠 슬라이드 방향 (1: Next, -1: Prev)
  const [direction] = useState(1)

  const stepsArray = Children.toArray(children) as React.ReactElement<StepProps>[]

  return (
    <div className='mt-14 flex h-[calc(100vh-56px)] flex-1 flex-col items-center p-4 sm:aspect-[4/3] md:aspect-[2/1]'>
      <div className='flex h-full w-1/2 flex-col items-center gap-8'>
        {/* Header: 단계 표시기 (인디케이터) */}
        <StepIndicator stepsArray={stepsArray} curStep={curStep} setCurStep={onStepChange} />

        {/* Body: 단계별 콘텐츠 (애니메이션 적용) */}
        <div className='relative flex h-fit w-full flex-col gap-8 overflow-hidden'>
          <StepContent curStep={curStep} direction={direction}>
            {stepsArray[curStep - 1]}
          </StepContent>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// Sub Components
// ----------------------------------------------------------------------

/**
 * 개별 단계 래퍼 컴포넌트
 * 실제 렌더링은 StepperMain 내부에서 처리되므로 children만 반환합니다.
 */
const Step = ({ children }: StepProps) => {
  return <>{children}</>
}

/**
 * 단계별 콘텐츠 렌더링 및 애니메이션 처리 컴포넌트
 * @param direction - 슬라이드 방향 (1: 오른쪽에서 왼쪽, -1: 왼쪽에서 오른쪽)
 */
const StepContent = ({
  curStep,
  children,
  direction
}: {
  curStep: number
  children: React.ReactNode
  direction: number
}) => {
  // Framer Motion 애니메이션 변형 정의
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0
    })
  }

  return (
    <AnimatePresence mode='wait' initial={false} custom={direction}>
      <motion.div
        key={curStep}
        variants={variants}
        initial='enter'
        animate='center'
        exit='exit'
        custom={direction}
        transition={{ duration: 0.2 }}
        className='h-fit w-full'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * 상단 단계 표시기 컴포넌트
 */
interface StepIndicatorProps {
  stepsArray: React.ReactElement<StepProps>[]
  curStep: number
  setCurStep: Dispatch<SetStateAction<number>>
}

const StepIndicator = ({ stepsArray, curStep, setCurStep }: StepIndicatorProps) => {
  const totalStep = stepsArray.length

  const handleClick = (stepNumber: number) => {
    // 이전 단계로만 이동 가능 (또는 현재 단계)
    setCurStep((prev) => (prev < stepNumber ? prev : stepNumber))
  }

  return (
    <div className='flex w-2/3 items-center justify-center px-4 py-8'>
      {stepsArray.map((child, index) => {
        const stepNumber = index + 1
        const status =
          stepNumber < curStep ? 'complete' : stepNumber === curStep ? 'active' : 'inactive'
        const label = child.props.label

        return (
          <React.Fragment key={stepNumber}>
            {/* Step Circle */}
            <div className='relative z-10 flex flex-col items-center'>
              <motion.div
                onClick={() => handleClick(stepNumber)}
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-semibold'
                animate={status}
                variants={{
                  inactive: { backgroundColor: '#E5E7EB', color: '#9CA3AF' },
                  active: { backgroundColor: '#2563EB', color: '#ffffff', scale: 1.1 },
                  complete: { backgroundColor: '#2563EB', color: '#ffffff' }
                }}
                transition={{ duration: 0.3 }}
              >
                {status === 'complete' ? <CheckIcon className='h-4 w-4' /> : stepNumber}
              </motion.div>

              {/* Label */}
              {label && (
                <div className='absolute top-8 w-32 text-center'>
                  <span
                    className={`text-xs font-medium ${status === 'active' ? 'text-blue-600' : 'text-gray-500'}`}
                  >
                    {label}
                  </span>
                </div>
              )}
            </div>

            {/* Connector Line */}
            {stepNumber < totalStep && (
              <div className='relative mx-2 h-[2px] min-w-[30px] flex-1 bg-gray-200'>
                <motion.div
                  className='absolute top-0 left-0 h-full bg-blue-600'
                  initial={{ width: '0%' }}
                  animate={{ width: curStep > stepNumber ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

const StepperButton = ({ children, buttonType, className, ...props }: StepperButtonProps) => {
  return (
    <Button
      className={twMerge('flex-1', className)}
      variant={buttonType === 'NEXT' ? 'button-blue' : 'button-gray-outline'}
      {...props}
    >
      {children}
    </Button>
  )
}

export { Stepper, Step, StepperButton }
