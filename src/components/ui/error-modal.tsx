import { Button } from './button'
interface ErrorModalProps {
  message: string
  onClose: () => void
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-2/3 bg-white rounded shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          X
        </button>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p>{message}</p>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} variant="destructive" className="px-4 py-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
