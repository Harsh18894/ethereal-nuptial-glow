import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface RSVPData {
  name: string;
  email?: string;
  attendance: 'yes' | 'no';
  guests: number;
  message?: string;
  createdAt: Date;
}

export interface RSVPResponse extends RSVPData {
  id: string;
}

// Submit RSVP
export const submitRSVP = async (data: Omit<RSVPData, 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'rsvp_responses'), {
      ...data,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw new Error('Failed to submit RSVP');
  }
};

// Get all RSVP responses
export const getRSVPResponses = async (): Promise<RSVPResponse[]> => {
  try {
    const q = query(collection(db, 'rsvp_responses'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    })) as RSVPResponse[];
  } catch (error) {
    console.error('Error fetching RSVP responses:', error);
    throw new Error('Failed to fetch RSVP responses');
  }
};

// Get RSVP statistics
export const getRSVPStats = async () => {
  try {
    const responses = await getRSVPResponses();
    
    return {
      total: responses.length,
      attending: responses.filter(r => r.attendance === 'yes').length,
      notAttending: responses.filter(r => r.attendance === 'no').length,
      totalGuests: responses.filter(r => r.attendance === 'yes').reduce((sum, r) => sum + r.guests, 0)
    };
  } catch (error) {
    console.error('Error fetching RSVP stats:', error);
    throw new Error('Failed to fetch RSVP statistics');
  }
};
