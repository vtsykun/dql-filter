<?php

namespace Okvpn\Bundle\DqlFilterBundle\Filter;

use Okvpn\Bundle\DqlFilterBundle\Form\Type\DQLFilterType;
use Oro\Bundle\FilterBundle\Datasource\FilterDatasourceAdapterInterface;
use Oro\Bundle\FilterBundle\Datasource\Orm\OrmExpressionBuilder;
use Oro\Bundle\FilterBundle\Datasource\Orm\OrmFilterDatasourceAdapter;
use Oro\Bundle\FilterBundle\Filter\AbstractFilter;
use Oro\Bundle\FilterBundle\Filter\FilterUtility;

class DqlFilter extends AbstractFilter
{
    /**
     * {@inheritdoc}
     */
    public function getMetadata()
    {
        $defaultMetadata = [
            'name'                     => $this->getName(),
            // use filter name if label not set
            'label'                    => ucfirst($this->name),
            'choices'                  => [],
        ];

        $metadata = array_diff_key(
            $this->get() ?: [],
            array_flip($this->util->getExcludeParams())
        );
        $metadata = $this->mapParams($metadata);
        $metadata = array_merge($defaultMetadata, $metadata);
        $metadata['lazy'] = $this->isLazy();

        return $metadata;
    }

    /**
     * {@inheritdoc}
     */
    protected function getFormType()
    {
        return DQLFilterType::class;
    }

    /**
     * {@inheritdoc}
     * @param OrmFilterDatasourceAdapter $ds
     */
    public function apply(FilterDatasourceAdapterInterface $ds, $data)
    {
        $expressionBuilder = $ds->expr();
        if (!$expressionBuilder instanceof OrmExpressionBuilder) {
            throw new \LogicException('The DqlFilter supports ORM data source only.');
        }

        $entities = $ds->getQueryBuilder()->getRootEntities();

        if (isset($data['value'])) {
            $uniquePrefix = substr(sha1(uniqid('', true)), 0, 8);
            $subQuery = $this->getDQLPrefix(reset($entities)) . $data['value'];
            $subQuery = preg_replace('/\x20rootEntity/', ' rootEntity' . $uniquePrefix, $subQuery);
            $subQuery = preg_replace('/rootEntity\./', 'rootEntity' . $uniquePrefix . '.', $subQuery);
            $expr = $expressionBuilder->in($this->get(FilterUtility::DATA_NAME_KEY), $subQuery);
            $this->applyFilterToClause($ds, $expr);
        }
    }

    /**
     * @param string $entity
     * @return string
     */
    private function getDQLPrefix($entity)
    {
        return 'SELECT rootEntity.id ' . sprintf('FROM %s rootEntity ', $entity);
    }
}
