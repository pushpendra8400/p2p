import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { useAppStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { cn } from '../../lib/utils';
import { generateId } from '../../lib/utils';
import { Reveal, Stagger } from '../../motion';

interface VehicleFormData {
  name: string;
  type: 'car' | 'bike' | 'suv' | 'truck';
  licensePlate: string;
  color: string;
  isDefault: boolean;
}

const vehicleTypes = [
  { value: 'car', label: 'Sedan', icon: '🚗' },
  { value: 'suv', label: 'SUV', icon: '🚙' },
  { value: 'bike', label: 'Bike', icon: '🏍️' },
  { value: 'truck', label: 'Truck', icon: '🚚' },
];

const colors = ['White', 'Black', 'Silver', 'Red', 'Blue', 'Green', 'Gold', 'Maroon'];

const validatePlate = (plate: string): boolean => {
  // Indian number plate format: XX 12 AB 1234
  const regex = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
  return regex.test(plate.toUpperCase());
};

const formatPlate = (plate: string): string => {
  const clean = plate.replace(/\s/g, '').toUpperCase();
  if (clean.length <= 2) return clean;
  if (clean.length <= 4) return `${clean.slice(0, 2)} ${clean.slice(2)}`;
  if (clean.length <= 6) return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4)}`;
  return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, 6)} ${clean.slice(6, 10)}`;
};

const Vehicles: React.FC = () => {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle, setDefaultVehicle } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState<VehicleFormData>({
    name: '',
    type: 'car',
    licensePlate: '',
    color: 'White',
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOpenModal = (vehicleId?: string) => {
    if (vehicleId) {
      const vehicle = vehicles.find((v) => v.id === vehicleId);
      if (vehicle) {
        setFormData({
          name: vehicle.name,
          type: vehicle.type,
          licensePlate: vehicle.licensePlate,
          color: vehicle.color,
          isDefault: vehicle.isDefault,
        });
        setEditingId(vehicleId);
      }
    } else {
      setFormData({
        name: '',
        type: 'car',
        licensePlate: '',
        color: 'White',
        isDefault: false,
      });
      setEditingId(null);
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Vehicle name is required';
    if (!formData.licensePlate.trim()) newErrors.licensePlate = 'License plate is required';
    else if (!validatePlate(formData.licensePlate)) {
      newErrors.licensePlate = 'Invalid format. Use: XX 12 AB 1234';
    }

    // Check for duplicate plates (excluding current vehicle if editing)
    const plateExists = vehicles.some(
      (v) => v.licensePlate === formData.licensePlate && v.id !== editingId
    );
    if (plateExists) newErrors.licensePlate = 'This license plate already exists';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveVehicle = () => {
    if (!validateForm()) return;

    if (editingId) {
      updateVehicle(editingId, {
        name: formData.name,
        type: formData.type,
        licensePlate: formData.licensePlate.toUpperCase(),
        color: formData.color,
        isDefault: formData.isDefault,
      });
    } else {
      addVehicle({
        id: generateId('v'),
        name: formData.name,
        type: formData.type,
        licensePlate: formData.licensePlate.toUpperCase(),
        color: formData.color,
        isDefault: formData.isDefault || vehicles.length === 0,
      });
    }

    if (formData.isDefault) {
      setDefaultVehicle(editingId || generateId('v'));
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Reveal>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
            <p className="text-gray-600 mt-1">Manage your vehicles for parking bookings</p>
          </div>
          <motion.button
            onClick={() => handleOpenModal()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="flex items-center gap-2">
              <Plus size={20} /> Add Vehicle
            </Button>
          </motion.button>
        </div>
      </Reveal>

      {/* Vehicles List */}
      {vehicles.length === 0 ? (
        <Reveal className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-5xl mb-4">🚗</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles yet</h3>
            <p className="text-gray-600 mb-6">Add your first vehicle to start booking parking spaces</p>
            <Button onClick={() => handleOpenModal()}>Add Your First Vehicle</Button>
          </div>
        </Reveal>
      ) : (
        <Stagger className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              whileHover={{ y: -4 }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{vehicle.name}</h3>
                  <p className="text-sm text-gray-600">{vehicle.type.toUpperCase()}</p>
                </div>
                {vehicle.isDefault && (
                  <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    Default
                  </span>
                )}
              </div>

              {/* Card Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Plate:</span>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono text-gray-900">
                    {vehicle.licensePlate}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Color:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: vehicle.color.toLowerCase() }}
                    />
                    <span className="text-sm text-gray-900">{vehicle.color}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                {!vehicle.isDefault && (
                  <motion.button
                    onClick={() => setDefaultVehicle(vehicle.id)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Set Default
                  </motion.button>
                )}
                <motion.button
                  onClick={() => handleOpenModal(vehicle.id)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit2 size={18} />
                </motion.button>
                <motion.button
                  onClick={() => setDeleteConfirmId(vehicle.id)}
                  className="p-2 text-error hover:bg-red-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </Stagger>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingId ? 'Edit Vehicle' : 'Add New Vehicle'}
        size="md"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVehicle}>
              {editingId ? 'Update' : 'Add'} Vehicle
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Vehicle Type Picker */}
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-3">Vehicle Type</label>
            <div className="grid grid-cols-4 gap-3">
              {vehicleTypes.map((type) => (
                <motion.button
                  key={type.value}
                  onClick={() => setFormData({ ...formData, type: type.value as any })}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all text-center',
                    formData.type === type.value
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-xs font-medium text-gray-900">{type.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Vehicle Name */}
          <Input
            label="Vehicle Name/Model"
            placeholder="e.g., Honda City"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          {/* License Plate */}
          <Input
            label="License Plate Number"
            placeholder="e.g., MH 02 AB 1234"
            value={formData.licensePlate}
            onChange={(e) => setFormData({ ...formData, licensePlate: formatPlate(e.target.value) })}
            error={errors.licensePlate}
            hint="Indian format: XX 12 AB 1234"
          />

          {/* Color Picker */}
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-3">Color</label>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={cn(
                    'p-3 rounded-lg border-2 transition-all',
                    formData.color === color ? 'border-primary scale-110' : 'border-gray-200 hover:border-gray-300'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-full h-8 rounded border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <div className="text-xs text-center mt-2 text-gray-900">{color}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Set as Default */}
          <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-4 h-4 text-primary rounded"
            />
            <span className="text-sm font-medium text-gray-900">Set as default vehicle</span>
          </label>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal
        open={!!deleteConfirmId}
        onOpenChange={() => setDeleteConfirmId(null)}
        title="Delete Vehicle"
        size="sm"
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (deleteConfirmId) {
                  deleteVehicle(deleteConfirmId);
                  setDeleteConfirmId(null);
                }
              }}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete this vehicle? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default Vehicles;
