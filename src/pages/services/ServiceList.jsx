import React, { useState, useEffect } from 'react';
import { getServiceCategories, createServiceCategory, createServiceType } from '../../services/service.service';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Plus, FolderPlus, Wrench, ChevronDown, ChevronUp } from 'lucide-react';

export const ServiceList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Category Modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Service Type Modal
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [targetCatId, setTargetCatId] = useState(null);
  const [typeName, setTypeName] = useState('');
  const [typeDesc, setTypeDesc] = useState('');
  const [typePrice, setTypePrice] = useState('');
  const [typeTime, setTypeTime] = useState('60 mins');

  const fetchCategories = async () => {
    setLoading(true);
    const data = await getServiceCategories();
    setCategories(data);
    if (data.length > 0 && !expandedCategory) {
      setExpandedCategory(data[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    await createServiceCategory({ name: newCatName, description: newCatDesc });
    setNewCatName('');
    setNewCatDesc('');
    setIsCatModalOpen(false);
    fetchCategories();
  };

  const handleAddType = async (e) => {
    e.preventDefault();
    if (!typeName.trim() || !targetCatId) return;
    await createServiceType(targetCatId, {
      name: typeName,
      description: typeDesc,
      defaultPrice: parseFloat(typePrice) || 0,
      estimatedTime: typeTime
    });
    setTypeName('');
    setTypeDesc('');
    setTypePrice('');
    setIsTypeModalOpen(false);
    fetchCategories();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', minWidth: 0 }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        backgroundColor: 'var(--surface)',
        padding: '16px 20px',
        borderRadius: '16px',
        border: '1px solid var(--border)'
      }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
            Workshop Service & Catalog Management
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Customize dynamic service categories, sub-types, labor defaults, and custom pricing.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCatModalOpen(true)}>
          <FolderPlus size={16} /> Add Service Category
        </Button>
      </div>

      {/* Category Accordion / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
        {categories.map((cat) => {
          const isExpanded = expandedCategory === cat.id;

          return (
            <div
              key={cat.id}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Category Bar */}
              <div
                onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? 'var(--surface-2)' : 'transparent',
                  borderBottom: isExpanded ? '1px solid var(--border)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--primary-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0
                  }}>
                    <Wrench size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                        {cat.name}
                      </h3>
                      <Badge variant="info">{cat.types?.length || 0} Service Types</Badge>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cat.description}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTargetCatId(cat.id);
                      setIsTypeModalOpen(true);
                    }}
                  >
                    <Plus size={14} /> Add Service Type
                  </Button>
                  {isExpanded ? <ChevronUp size={18} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                </div>
              </div>

              {/* Expanded Sub-Types Grid */}
              {isExpanded && (
                <div style={{ padding: '16px 20px' }}>
                  {cat.types && cat.types.length > 0 ? (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '12px'
                    }}>
                      {cat.types.map((type) => (
                        <div
                          key={type.id}
                          style={{
                            backgroundColor: 'var(--surface-2)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            padding: '14px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '8px'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                                {type.name}
                              </h4>
                              <Badge variant="success">Active</Badge>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>
                              {type.description}
                            </p>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '4px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-soft)' }}>Est. Time: {type.estimatedTime}</span>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)' }}>
                              {formatCurrency(type.defaultPrice)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                      No service types configured yet for this category. Click "+ Add Service Type" to create one.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD CATEGORY */}
      {isCatModalOpen && (
        <Modal title="Create New Service Category" onClose={() => setIsCatModalOpen(false)}>
          <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Category Name</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Washing, Mechanical Works, Detailing"
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Description</label>
              <textarea
                rows={2}
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Brief category description..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <Button type="button" variant="ghost" onClick={() => setIsCatModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Create Category</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: ADD SERVICE TYPE */}
      {isTypeModalOpen && (
        <Modal title="Add Custom Service Type" onClose={() => setIsTypeModalOpen(false)}>
          <form onSubmit={handleAddType} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Service Name</label>
              <input
                type="text"
                required
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                placeholder="e.g. Engine Room Cleaning, Clutch Repair"
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Description</label>
              <input
                type="text"
                value={typeDesc}
                onChange={(e) => setTypeDesc(e.target.value)}
                placeholder="Details of what is included..."
                style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Default Price (₹)</label>
                <input
                  type="number"
                  required
                  value={typePrice}
                  onChange={(e) => setTypePrice(e.target.value)}
                  placeholder="e.g. 800"
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Estimated Time</label>
                <input
                  type="text"
                  value={typeTime}
                  onChange={(e) => setTypeTime(e.target.value)}
                  placeholder="e.g. 45 mins"
                  style={{ width: '100%', height: '44px', padding: '0 12px', borderRadius: '10px', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <Button type="button" variant="ghost" onClick={() => setIsTypeModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Service Type</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
