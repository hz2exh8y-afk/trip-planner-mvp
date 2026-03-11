'use client';

import { useMemo, useState } from 'react';

const interests = [
  'Food',
  'Culture',
  'Nightlife',
  'Shopping',
  'Nature',
  'Relaxed',
  'Hidden gems',
  'Family-friendly'
];

const travelTypes = ['Solo', 'Couple', 'Friends', 'Family'];

export default function PlannerForm() {
  const [destination, setDestination] = useState('Tokyo');
  const [days, setDays] = useState('5');
  const [budget, setBudget] = useState('150');
  const [groupType, setGroupType] = useState('Couple');
  const [travelGoal, setTravelGoal] = useState('Good food, efficient route, and a balanced pace');
  const [foodNotes, setFoodNotes] = useState('Ramen, sushi, izakaya, cafe stops');
  const [selectedInterests, setSelectedInterests] = useState(['Food', 'Culture']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const canSubmit = useMemo(() => {
    return destination.trim() && days && budget && groupType && selectedInterests.length > 0;
  }, [destination, days, budget, groupType, selectedInterests]);

  function toggleInterest(item) {
    setSelectedInterests((current) =>
      current.includes(item)
        ? current.filter((v) => v !== item)
        : [...current, item]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          days: Number(days),
          budgetPerDay: Number(budget),
          groupType,
          travelGoal,
          foodNotes,
          interests: selectedInterests
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setResult(data.plan);
    } catch (err) {
      setError(err.message || 'Failed to generate plan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid">
      <section className="card">
        <h2 className="sectionTitle">Trip inputs</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGrid">
            <div>
              <label>Destination</label>
              <input className="input" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Tokyo" />
            </div>
            <div>
              <label>Days</label>
              <select className="select" value={days} onChange={(e) => setDays(e.target.value)}>
                {[2,3,4,5,6,7,10].map((n) => <option key={n} value={n}>{n} days</option>)}
              </select>
            </div>
            <div>
              <label>Budget per day (USD)</label>
              <input className="input" type="number" min="20" step="10" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
            <div>
              <label>Group type</label>
              <select className="select" value={groupType} onChange={(e) => setGroupType(e.target.value)}>
                {travelTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label>Main goal</label>
            <input className="input" value={travelGoal} onChange={(e) => setTravelGoal(e.target.value)} placeholder="Fast-paced sightseeing with good food" />
          </div>

          <div style={{ marginTop: 16 }}>
            <label>Food notes</label>
            <input className="input" value={foodNotes} onChange={(e) => setFoodNotes(e.target.value)} placeholder="Sushi, yakiniku, cafes" />
          </div>

          <div style={{ marginTop: 16 }}>
            <label>Pick interests</label>
            <div className="chips">
              {interests.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`chip ${selectedInterests.includes(item) ? 'active' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className="button" disabled={!canSubmit || loading}>
            {loading ? 'Generating plan...' : 'Generate trip plan'}
          </button>
          <div className="small" style={{ marginTop: 10 }}>
            Start here. Login, comments, maps, and saved trips can come later.
          </div>
          {error ? <div className="notice">{error}</div> : null}
        </form>
      </section>

      <section className="card">
        <h2 className="sectionTitle">AI result</h2>
        {result ? (
          <div className="result">{result}</div>
        ) : (
          <div className="muted">
            Your generated itinerary will show here.

            {'\n\n'}Suggested output format:
            {'\n'}- quick trip summary
            {'\n'}- daily itinerary
            {'\n'}- food suggestions
            {'\n'}- estimated spend
            {'\n'}- practical notes
          </div>
        )}
      </section>
    </div>
  );
}
