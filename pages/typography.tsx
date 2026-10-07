import Head from 'next/head';
import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import clampBuilder from '@utils/clamp-builder';
import Text from '@components/text';
import { Pencil, Plus, RotateCcw, FileCode, Trash } from 'lucide-react';

const PageLayout = styled.div`
  display: flex;
  min-height: calc(100vh - 10rem);
  background-color: #0d1117;
  color: #c9d1d9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
`;

const Sidebar = styled.aside`
  width: 300px;
  background-color: #161b22;
  border-right: 1px solid #30363d;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  flex-shrink: 0;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #c9d1d9;
`;

const Input = styled.input`
  background-color: #0d1117;
  border: 1px solid #30363d;
  color: #c9d1d9;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #58a6ff;
  }
`;

const Select = styled.select`
  background-color: #0d1117;
  border: 1px solid #30363d;
  color: #c9d1d9;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #58a6ff;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #30363d;
  color: #fff;
`;

const Actions = styled.div`
  display: none;
  flex-direction: column;
  gap: 0.25rem;
  position: absolute;
  left: 0;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #30363d;
  gap: 2rem;
  position: relative;
  padding-left: 3rem; /* space for actions */

  &:hover ${Actions} {
    display: flex;
  }
`;

const ActionBtn = styled.button`
  background-color: transparent;
  color: #8b949e;
  border: 1px solid #30363d;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: #c9d1d9;
    border-color: #8b949e;
    background-color: #30363d;
  }
`;

const VarName = styled.div`
  font-family: monospace;
  font-size: 0.9rem;
  width: 120px;
  flex-shrink: 0;
`;

const SizeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100px;
  flex-shrink: 0;
  font-size: 0.8rem;
`;

const SizePill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Badge = styled.span`
  background-color: #21262d;
  border: 1px solid #30363d;
  border-radius: 3px;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: 600;
`;

const PreviewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
`;

const PreviewText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ToolGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ToolBtn = styled.button`
  background-color: #21262d;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #30363d;
  }
  &.active {
    background-color: #e3b341;
    color: #0d1117;
    border-color: #e3b341;
  }
`;

const CodeBlock = styled.pre`
  background-color: #161b22;
  padding: 1.5rem;
  border-radius: 6px;
  border: 1px solid #30363d;
  color: #c9d1d9;
  font-family: monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const ratioOptions = [
  { label: '1.067 (Minor Second)', value: 1.067 },
  { label: '1.125 (Major Second)', value: 1.125 },
  { label: '1.200 (Minor Third)', value: 1.2 },
  { label: '1.250 (Major Third)', value: 1.25 },
  { label: '1.333 (Perfect Fourth)', value: 1.333 },
  { label: '1.414 (Augmented Fourth)', value: 1.414 },
  { label: '1.500 (Perfect Fifth)', value: 1.5 },
  { label: '1.618 (Golden Ratio)', value: 1.618 }
];

const defaultScaleSteps = [
  { name: '2xs', step: -3 },
  { name: 'xs', step: -2 },
  { name: 's', step: -1 },
  { name: 'm', step: 0 },
  { name: 'l', step: 1 },
  { name: 'xl', step: 2 },
  { name: '2xl', step: 3 }
];

export default function Typography(): JSX.Element {
  const [prefix, setPrefix] = useState('text-');
  const [minBase, setMinBase] = useState(16);
  const [minRatio, setMinRatio] = useState(1.25);
  const [maxBase, setMaxBase] = useState(18);
  const [maxRatio, setMaxRatio] = useState(1.333);

  const [steps, setSteps] = useState(defaultScaleSteps);
  const [activeTab, setActiveTab] = useState('variables'); // 'variables' | 'css'

  const variables = useMemo(() => {
    return steps.map(({ name, step }) => {
      const minPx = minBase * Math.pow(minRatio, step);
      const maxPx = maxBase * Math.pow(maxRatio, step);

      const clampValue = clampBuilder({
        minFontSize: `${minPx}px`,
        maxFontSize: `${maxPx}px`,
        minWidth: '414px',
        maxWidth: '1920px',
        root: '16',
        outputUnit: 'rem'
      });

      return {
        name,
        varName: `--${prefix}${name}`,
        minPx,
        maxPx,
        clampValue
      };
    });
  }, [prefix, minBase, minRatio, maxBase, maxRatio, steps]);

  const handleAddStep = () => {
    setSteps(prev => {
      const maxStep = prev.length > 0 ? Math.max(...prev.map(p => p.step)) : 0;
      const newStep = maxStep + 1;

      let name = '';
      if (newStep === -3) name = '2xs';
      else if (newStep === -2) name = 'xs';
      else if (newStep === -1) name = 's';
      else if (newStep === 0) name = 'm';
      else if (newStep === 1) name = 'l';
      else if (newStep === 2) name = 'xl';
      else if (newStep > 2) name = `${newStep - 1}xl`;
      else name = `custom-${newStep}`;

      return [...prev, { name, step: newStep }];
    });
  };

  const handleRemoveStep = (nameToRemove: string) => {
    setSteps(prev => prev.filter(p => p.name !== nameToRemove));
  };

  const handleReset = () => {
    setSteps(defaultScaleSteps);
    setPrefix('text-');
    setMinBase(16);
    setMinRatio(1.25);
    setMaxBase(18);
    setMaxRatio(1.333);
  };

  const cssText = useMemo(() => {
    const cssVars = variables.map(v => `  ${v.varName}: ${v.clampValue};`).join('\n');
    return `:root {\n${cssVars}\n}`;
  }, [variables]);

  return (
    <>
      <Head>
        <title>Typography Scale | Font-size clamp() generator</title>
      </Head>

      <PageLayout>
        <Sidebar>
          {/* We remove the copy button here as requested, moving actions to toolbar */}
          <FormGroup>
            <Label>Variable prefix</Label>
            <Input
              value={prefix}
              onChange={e => setPrefix(e.target.value)}
            />
          </FormGroup>


          <div style={{ marginTop: '1rem' }}>
            <SectionTitle>Minimum (Mobile)</SectionTitle>
            <FormGroup style={{ marginTop: '1rem' }}>
              <Label>Base font size (px)</Label>
              <Input
                type="number"
                value={minBase}
                onChange={e => setMinBase(Number(e.target.value))}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: '1rem' }}>
              <Label>Type scale ratio</Label>
              <Select
                value={minRatio}
                onChange={e => setMinRatio(Number(e.target.value))}
              >
                {ratioOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </FormGroup>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <SectionTitle>Maximum (Desktop)</SectionTitle>
            <FormGroup style={{ marginTop: '1rem' }}>
              <Label>Base font size (px)</Label>
              <Input
                type="number"
                value={maxBase}
                onChange={e => setMaxBase(Number(e.target.value))}
              />
            </FormGroup>
            <FormGroup style={{ marginTop: '1rem' }}>
              <Label>Type scale ratio</Label>
              <Select
                value={maxRatio}
                onChange={e => setMaxRatio(Number(e.target.value))}
              >
                {ratioOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </FormGroup>
          </div>
        </Sidebar>

        <MainContent>
          <Toolbar>
            <Text variant="title" as="h2" style={{ color: '#fff', margin: 0 }}>
              {activeTab === 'variables' ? 'Typography Variables' : 'Generated CSS'}
            </Text>

            <ToolGroup>
              <ToolBtn title="Edit" onClick={() => setActiveTab('variables')} className={activeTab === 'variables' ? 'active' : ''}>
                <Pencil size={16} />
              </ToolBtn>

              <ToolBtn title="Create (Scale)" onClick={handleAddStep}>
                <Plus size={16} />
              </ToolBtn>

              <ToolBtn title="Reset" onClick={handleReset}>
                <RotateCcw size={16} />
              </ToolBtn>

              <ToolBtn title="Generated CSS" onClick={() => setActiveTab('css')} className={activeTab === 'css' ? 'active' : ''}>
                <FileCode size={16} />
              </ToolBtn>
            </ToolGroup>
          </Toolbar>

          {activeTab === 'variables' ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {variables.map((v) => (
                <TableRow key={v.name}>
                  <Actions>
                    <ActionBtn onClick={handleAddStep} title="Add next variable">
                      <Plus size={14} />
                    </ActionBtn>
                    <ActionBtn onClick={() => handleRemoveStep(v.name)} title="Remove variable">
                      <Trash size={14} />
                    </ActionBtn>
                  </Actions>

                  <VarName>{v.varName}</VarName>

                  <SizeInfo>
                    <SizePill>
                      <Badge>MIN</Badge>
                      <span>{v.minPx.toFixed(2)}px</span>
                    </SizePill>
                    <SizePill>
                      <Badge>MAX</Badge>
                      <span>{v.maxPx.toFixed(2)}px</span>
                    </SizePill>
                  </SizeInfo>

                  <PreviewContainer>
                    <PreviewText style={{ fontSize: `${v.minPx}px` }}>
                      Amazingly few discotheques provide jukeboxes
                    </PreviewText>
                    <PreviewText style={{ fontSize: `${v.maxPx}px` }}>
                      Amazingly few discotheques provide jukeboxes
                    </PreviewText>
                  </PreviewContainer>
                </TableRow>
              ))}
            </div>
          ) : (
            <CodeBlock>
              {`/* Variables for scale: Typography */\n\n`}
              {cssText}
            </CodeBlock>
          )}
        </MainContent>
      </PageLayout>
    </>
  );
}
