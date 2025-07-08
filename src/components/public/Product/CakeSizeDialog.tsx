import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/public/ui/Button';

type Props = {
  open: boolean;
  selectedSize: string;
  onSelectSize: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  CAKE_SIZES: { id: string; sizeLabel: string,price: any }[];
}

const CakeSizeDialog = ({
  open,
  selectedSize,
  onSelectSize,
  onClose,
  onConfirm,
  CAKE_SIZES
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white p-6 rounded-xl w-full max-w-md"
          >
            <h2 className="text-lg font-semibold mb-4">Select Cake Size</h2>
            <div className="flex flex-col gap-3">
              {CAKE_SIZES.map((size: any) => (
                <label key={size.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={size.id}
                    checked={selectedSize === size.id}
                    onChange={(e) => onSelectSize(e.target.value)}
                    className="accent-pink-500"
                  />
                  <span>{size.sizeLabel}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              {/* <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Cancel
              </button> */}
              <Button
                onClick={onClose}
                variant='outline'
              >
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                variant='primary'
              >
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CakeSizeDialog;
