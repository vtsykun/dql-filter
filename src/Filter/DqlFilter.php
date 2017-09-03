<?php

namespace Okvpn\Bundle\DqlFilterBundle\Filter;

use Oro\Bundle\FilterBundle\Datasource\FilterDatasourceAdapterInterface;
use Oro\Bundle\FilterBundle\Datasource\Orm\OrmExpressionBuilder;
use Oro\Bundle\FilterBundle\Datasource\Orm\OrmFilterDatasourceAdapter;
use Oro\Bundle\FilterBundle\Filter\AbstractFilter;
use Oro\Bundle\FilterBundle\Filter\FilterUtility;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class DqlFilter extends AbstractFilter
{
    /**
     * {@inheritdoc}
     */
    public function getMetadata()
    {
        $defaultMetadata = [
            'name'                     => $this->getName(),
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
        return TextType::class;
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
            $expr = $expressionBuilder->in(
                $this->get(FilterUtility::DATA_NAME_KEY), $this->getDQLPrefix(reset($entities)) . $data['value']
            );
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
