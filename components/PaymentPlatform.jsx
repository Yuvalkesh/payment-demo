import React, { useState } from 'react';
import { CheckCircle, Wallet } from 'lucide-react';

export default function PaymentPlatform() {
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('xrpl');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const suppliers = [
    {
      id: 1,
      name: "Rajesh Textiles Ltd",
      address: "rSupp1RajeshText123456789Delhi",
      location: "Mumbai, India"
    },
    {
      id: 2,
      name: "Krishna Fabrics International",
      address: "rSupp2KrishnaFab123456789Chen",
      location: "Chennai, India"
    },
    {
      id: 3,
      name: "Patel Cotton Exports",
      address: "rSupp3PatelCott123456789Ahme",
      location: "Ahmedabad, India"
    }
  ];

  const calculateFees = () => {
    return selectedNetwork === 'xrpl' ? 0.001 : 0.3;
  };

  const handleSendPayment = () => {
    if (amount && selectedSupplier) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAmount('');
        setSelectedSupplier('');
      }, 3000);
    }
  };

  const selectedSupplierDetails = suppliers.find(s => s.address === selectedSupplier);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 relative">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center gap-4">
              <div className="text-green-500">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-xl font-bold text-center">Payment Successful!</h3>
              <p className="text-gray-600 text-center">
                {amount} RLUSD has been sent to {selectedSupplierDetails?.name}
              </p>
              <p className="text-sm text-gray-500">Funds are now in your supplier's account</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">FleetBridge Business Payments</h1>
        <p className="text-gray-600">Instant cross-border supplier payments with RLUSD</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Supplier Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Supplier</label>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white cursor-pointer"
          >
            <option value="">Choose a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.address}>
                {supplier.name} - {supplier.location}
              </option>
            ))}
          </select>
        </div>

        {/* Network Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Select Network</label>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedNetwork('xrpl')}
              className={`flex-1 p-4 rounded-lg border cursor-pointer ${
                selectedNetwork === 'xrpl' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="font-medium">XRPL</div>
              <div className="text-sm text-gray-500">Fee: 0.001%</div>
            </button>
            <button
              onClick={() => setSelectedNetwork('eth')}
              className={`flex-1 p-4 rounded-lg border cursor-pointer ${
                selectedNetwork === 'eth' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
            >
              <div className="font-medium">Ethereum</div>
              <div className="text-sm text-gray-500">Fee: 0.3%</div>
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Payment Amount (RLUSD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter amount"
          />
        </div>

        {/* Transaction Summary */}
        {amount && selectedSupplier && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="text-sm font-medium">Transaction Summary</div>
            <div className="flex justify-between text-sm">
              <span>Supplier:</span>
              <span>{selectedSupplierDetails?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span>{amount} RLUSD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Network Fee:</span>
              <span>{(amount * calculateFees()).toFixed(4)} RLUSD</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-2 border-t">
              <span>Total:</span>
              <span>{(Number(amount) + amount * calculateFees()).toFixed(4)} RLUSD</span>
            </div>
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={handleSendPayment}
          className={`w-full p-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
            amount && selectedSupplier 
              ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!amount || !selectedSupplier}
        >
          <Wallet size={20} />
          Send Payment to Supplier
        </button>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={16} />
            Instant Settlement
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={16} />
            Lowest Market Fees
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={16} />
            Direct to Supplier
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle size={16} />
            24/7 Payments
          </div>
        </div>
      </div>
    </div>
  );
}