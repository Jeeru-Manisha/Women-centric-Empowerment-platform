import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  User, Mail, Phone, MapPin, Star, Wallet, Shield,
  Camera, Edit2, Save, Clock, Award, History
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    availability: user?.availability || '',
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Header */}
          <div className="glass-card rounded-3xl p-6 lg:p-8 mb-6 gradient-peach">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-rose-light flex items-center justify-center border-4 border-card">
                  <User className="w-14 h-14 text-rose" />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-muted transition-colors">
                  <Camera className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                  <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                    {user.name}
                  </h1>
                  {user.isVerified && (
                    <Shield className="w-6 h-6 text-sage" />
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{user.email}</p>

                <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1 bg-card/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="font-semibold">{user.rating}</span>
                    <span className="text-muted-foreground text-sm">({user.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1 bg-card/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Wallet className="w-4 h-4 text-rose" />
                    <span className="font-semibold">₹{user.credits}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <Button
                variant={isEditing ? 'feminine' : 'outline'}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-3xl p-6">
                <h2 className="font-semibold text-lg text-foreground mb-4">Personal Information</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t('fullName')}</Label>
                    {isEditing ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{user.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('email')}</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        ) : (
                          <p className="text-foreground">{user.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('phone')}</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {isEditing ? (
                          <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        ) : (
                          <p className="text-foreground">{user.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('address')}</Label>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                      {isEditing ? (
                        <Textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={2}
                        />
                      ) : (
                        <p className="text-foreground">{user.address}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={formData.availability}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        />
                      ) : (
                        <p className="text-foreground">{user.availability}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="glass-card rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg text-foreground">{t('skills')}</h2>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/skills')}>
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(user.skills || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-rose-light text-rose-dark rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="glass-card rounded-3xl p-6">
                <h2 className="font-semibold text-lg text-foreground mb-4">{t('reviews')}</h2>
                {user.workHistory.filter(w => w.review).length > 0 ? (
                  <div className="space-y-4">
                    {user.workHistory.filter(w => w.review).map((work) => (
                      <div key={work.id} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-foreground">{work.customerName}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < (work.rating || 0) ? 'text-gold fill-gold' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{work.review}</p>
                        <p className="text-xs text-muted-foreground mt-1">{work.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No reviews yet</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="glass-card rounded-3xl p-6">
                <h2 className="font-semibold text-lg text-foreground mb-4">Statistics</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Earnings</span>
                    <span className="font-semibold text-foreground">₹{user.credits}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Completed Tasks</span>
                    <span className="font-semibold text-foreground">{user.workHistory.filter(w => w.status === 'completed').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-semibold text-foreground">{user.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Working Radius</span>
                    <span className="font-semibold text-foreground">{user.radius} km</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card rounded-3xl p-6">
                <h2 className="font-semibold text-lg text-foreground mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/skills')}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Update Skills
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/history')}
                  >
                    <History className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                </div>
              </div>

              {/* Verification Badge */}
              {user.isVerified && (
                <div className="bg-sage/20 rounded-2xl p-4 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-sage" />
                  <div>
                    <p className="font-semibold text-foreground">Verified User</p>
                    <p className="text-sm text-muted-foreground">Aadhaar verified</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
