import { useState, useEffect, useRef } from 'react';
import { stokvelService } from '@/services/stokvelService';
import { Stokvel, Vote, Activity } from '@/types/stokvel';

export const useStokvel = (userId: string = 'current-user') => {
  const [stokvels, setStokvels] = useState<Stokvel[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    loadData();
    
    return () => {
      isMountedRef.current = false;
    };
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [stokvelData, voteData, activityData] = await Promise.all([
        stokvelService.getStokvels(userId),
        stokvelService.getVotes(userId),
        stokvelService.getRecentActivity(userId)
      ]);
      
      if (isMountedRef.current) {
        setStokvels(stokvelData);
        setVotes(voteData);
        setActivities(activityData);
      }
    } catch (error) {
      console.error('Error loading stokvel data:', error);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const createStokvel = async (stokvelData: Partial<Stokvel>) => {
    try {
      const newStokvel = await stokvelService.createStokvel(stokvelData);
      if (isMountedRef.current) {
        setStokvels(prev => [...prev, newStokvel]);
      }
      return newStokvel;
    } catch (error) {
      console.error('Error creating stokvel:', error);
      throw error;
    }
  };

  const castVote = async (voteId: number, option: string) => {
    try {
      const success = await stokvelService.castVote(voteId, option);
      if (success) {
        if (isMountedRef.current) {
          setVotes(prev => 
            prev.map(vote => 
              vote.id === voteId ? { ...vote, hasVoted: true } : vote
            )
          );
        }
      }
      return success;
    } catch (error) {
      console.error('Error casting vote:', error);
      throw error;
    }
  };

  const refresh = () => {
    loadData();
  };

  return {
    stokvels,
    votes,
    activities,
    loading,
    createStokvel,
    castVote,
    refresh
  };
};