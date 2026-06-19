'use client'

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { Button } from '@transight-design/ui/components/button'

export const Preview = () => (
  <AlertDialogPrimitive.Root>
    <AlertDialogPrimitive.Trigger render={<Button appearance="outline">삭제</Button>} />
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50" />
      <AlertDialogPrimitive.Popup className="border-cool-grey-04 fixed top-1/2 left-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-6 shadow-lg">
        <AlertDialogPrimitive.Title className="typo-b18 text-cool-grey-11 mb-2">
          정말 삭제할까요?
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description className="text-description mb-5">
          이 작업은 되돌릴 수 없습니다.
        </AlertDialogPrimitive.Description>
        <div className="flex justify-end gap-2">
          <AlertDialogPrimitive.Close
            render={
              <Button appearance="outline" size="sm">
                취소
              </Button>
            }
          />
          <AlertDialogPrimitive.Close
            render={
              <Button color="red" size="sm">
                삭제
              </Button>
            }
          />
        </div>
      </AlertDialogPrimitive.Popup>
    </AlertDialogPrimitive.Portal>
  </AlertDialogPrimitive.Root>
)
