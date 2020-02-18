import { useBackend } from '../backend';
import { Section, LabeledList, ProgressBar, Button, BlockQuote } from '../components';

export const Intellicard = props => {
  const { act, data } = useBackend(props);

  const offline = (isDead || isBraindead);

  const {
    name,
    isDead,
    isBraindead,
    health,
    wireless,
    radio,
    wiping,
    laws = [],
  } = data;

  return (
    <Section
      title={name || "Empty Card"}
      buttons={!!name && (
        <Button
          icon="trash"
          content={wiping ? 'Stop Wiping' : 'Wipe'}
          disabled={isDead}
          onClick={() => act('wipe')} />
      )}>
      {!!name && (
        <LabeledList>
          <LabeledList.Item
            label="Status"
            color={(offline) ? 'bad' : 'good'}>
            {offline ? 'Offline' : 'Operation'}
          </LabeledList.Item>
          <LabeledList.Item label="Software Integrity">
            <ProgressBar
              value={health}
              minValue={0}
              maxValue={100}
              ranges={{
                good: [70, Infinity],
                average: [50, 70],
                bad: [-Infinity, 50],
              }}
            />
          </LabeledList.Item>
          <LabeledList.Item label="Settings">
            <Button
              icon="signal"
              content="Wireless Activity"
              selected={wireless}
              onClick={() => act('wireless')} />
            <Button
              icon="microphone"
              content="Subspace Radio"
              selected={radio}
              onClick={() => act('radio')} />
          </LabeledList.Item>
          <LabeledList.Item label="Laws">
            {laws.map(law => (
              <BlockQuote key={law}>
                {law}
              </BlockQuote>
            ))}
          </LabeledList.Item>
        </LabeledList>
      )}
    </Section>
  );
};
